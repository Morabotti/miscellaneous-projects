<?php

namespace Ves\Gdpr\Controller\Adminhtml\Show;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Customer\Api\CustomerRepositoryInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\Exception\InputException;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Exception\State\InputMismatchException;
use Magento\Framework\View\Result\PageFactory;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Sales\Api\Data\OrderAddressInterface;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderRepositoryInterface;
use Ves\Gdpr\Api\GdprRepositoryInterface;
use Ves\Gdpr\Model\GdprRequest;

class Conceal extends Action implements HttpGetActionInterface
{
    /** @var PageFactory */
    protected $resultPageFactory;

    /** @var SearchCriteriaBuilder */
    protected $searchCriteriaBuilder;

    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    /** @var CustomerRepositoryInterface */
    protected $customerRepository;

    /** @var OrderRepositoryInterface */
    protected $orderRepository;

    /** @var CartRepositoryInterface */
    protected $cartRepository;

    public function __construct(
        Context $context,
        GdprRepositoryInterface $gdprRepository,
        PageFactory $resultPageFactory,
        CustomerRepositoryInterface $customerRepository,
        OrderRepositoryInterface $orderRepository,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        CartRepositoryInterface $cartRepository
    ) {
        $this->gdprRepository = $gdprRepository;
        $this->resultPageFactory = $resultPageFactory;
        $this->customerRepository = $customerRepository;
        $this->orderRepository = $orderRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->cartRepository = $cartRepository;
        parent::__construct($context);
    }

    /**
     * Execute view action
     * @return ResponseInterface
     */
    public function execute()
    {
        $get = (array) $this->getRequest()->getParams();

        if (isset($get['id'])) {
            try {
                $gdprRequest = $this->gdprRepository->getById($get['id']);

                /*
                $action = $this->hasOrders($gdprRequest);
                if ($action == null) {
                    $this->messageManager->addErrorMessage(__('Cant handle this request.'));
                    return $this->_redirect('gdpr/listing');
                } elseif ($action == true) {
                    $this->concealCustomer($gdprRequest);
                    $this->concealOrders($gdprRequest);
                    $this->concealQuotes($gdprRequest);
                } else {
                    $this->deleteCustomer($gdprRequest);
                    $this->deleteQuotes($gdprRequest);
                    $this->deletesOrders($gdprRequest);
                }
                */

                $gdprRequest->setHandled(date('Y-m-d H:i:s'));
                $this->gdprRepository->save($gdprRequest);

                $this->messageManager->addSuccessMessage(__('Successfully handled GDPR request.'));
                return $this->_redirect('gdpr/show', ['id' => $gdprRequest->getId()]);
            } catch (\Exception $e) {
                $this->messageManager->addErrorMessage(__('No GDPR request found.'));
                return $this->_redirect('gdpr/listing');
            }
        }

        return $this->_redirect('gdpr/listing');
    }

    /**
     * Determinates whether to conceal, delete or do nothing.
     * Returns null when nothing should be done
     * Returns true if conceal
     * Return false if delete
     * @param GdprRequest $gdprRequest
     * @return null | boolean
     */
    private function hasOrders(GdprRequest $gdprRequest)
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter("customer_email", $gdprRequest->getEmail())
            ->create();

        $orders = $this->orderRepository
            ->getList($searchCriteria)
            ->getItems();

        if (sizeof($orders) == 0) {
            return false;
        }

        $hasOldOrders = true;

        foreach ($orders as $order) {
            if ($order->getStatus() == 'processing' || $order->getStatus() == 'pending') {
                return null;
            }

            if ($order->getCreatedAt() != null && strtotime($order->getCreatedAt()) < strtotime('-6 years')) {
                $hasOldOrders = false;
            }
        }

        return $hasOldOrders;
    }

    /**
     * Deletes customer.
     * @param GdprRequest $gdprRequest
     * @return void
     * @throws LocalizedException
     * @throws NoSuchEntityException
     */
    private function deleteCustomer(GdprRequest $gdprRequest)
    {
        $customer = $this->customerRepository->get($gdprRequest->getEmail());
        $this->customerRepository->deleteById($customer->getId());
    }

    /**
     * Deletes orders.
     * @param GdprRequest $gdprRequest
     * @return void
     */
    private function deletesOrders(GdprRequest $gdprRequest)
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter("customer_email", $gdprRequest->getEmail())
            ->create();

        $orders = $this->orderRepository
            ->getList($searchCriteria)
            ->getItems();

        if ($orders) {
            foreach ($orders as $order) {
                $this->orderRepository->delete($order);
            }
        }
    }

    /**
     * Deletes quotes data based on GDPR request.
     * @param GdprRequest $gdprRequest
     * @return void
     */
    private function deleteQuotes(GdprRequest $gdprRequest)
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter("customer_email", $gdprRequest->getEmail())
            ->create();

        $quotes = $this->cartRepository
            ->getList($searchCriteria)
            ->getItems();

        if ($quotes) {
            foreach ($quotes as $quote) {
                $this->cartRepository->delete($quote);
            }
        }
    }

    /**
     * Clears customer data based on GDPR request.
     * @param GdprRequest $gdprRequest
     * @return void
     * @throws InputException
     * @throws LocalizedException
     * @throws NoSuchEntityException
     * @throws InputMismatchException
     */
    private function concealCustomer(GdprRequest $gdprRequest)
    {
        $customer = $this->customerRepository->get($gdprRequest->getEmail());
        $addresses = $customer->getAddresses();

        if ($addresses) {
            foreach ($addresses as $addr) {
                $this->nullifyAddress($addr);
            }
            $customer->setAddresses($addresses);
        }

        $customer->setFirstname($this->randomize($customer->getFirstname()));
        $customer->setMiddlename($this->randomize($customer->getMiddlename()));
        $customer->setLastname($this->randomize($customer->getLastname()));
        $customer->setEmail($this->randomize($customer->getEmail()));
        $customer->setPrefix(null);
        $customer->setDefaultBilling(null);
        $customer->setDefaultShipping(null);
        $customer->setDob(null);

        $this->customerRepository->save($customer);
    }

    /**
     * Clears order data based on GDPR request.
     * @param GdprRequest $gdprRequest
     * @return void
     */
    private function concealOrders(GdprRequest $gdprRequest)
    {
        try {
            $searchCriteria = $this->searchCriteriaBuilder
                ->addFilter("customer_email", $gdprRequest->getEmail())
                ->create();

            $orders = $this->orderRepository
                ->getList($searchCriteria)
                ->getItems();

            if ($orders) {
                foreach ($orders as $order) {
                    $this->nullifyOrder($order);
                    $this->orderRepository->save($order);
                }
            }
        } catch (\Exception $e) {
        }
    }

    /**
     * Clears quotes data based on GDPR request.
     * @param GdprRequest $gdprRequest
     * @return void
     */
    private function concealQuotes(GdprRequest $gdprRequest)
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter("customer_email", $gdprRequest->getEmail())
            ->create();

        $quotes = $this->cartRepository
            ->getList($searchCriteria)
            ->getItems();

        if ($quotes) {
            foreach ($quotes as $quote) {
                $this->nullifyQuote($quote);
                $this->cartRepository->save($quote);
            }
        }
    }

    /**
     * Nullifies / hashes order object data.
     * @param OrderInterface $order
     * @return void
     */
    private function nullifyOrder(OrderInterface $order)
    {
        $billingAddr = $order->getBillingAddress();

        if ($billingAddr) {
            $this->nullifyBillingAddress($billingAddr);
            $order->setBillingAddress($billingAddr);
        }

        $order->setCustomerFirstname($this->randomize($order->getCustomerFirstname()));
        $order->setCustomerLastname($this->randomize($order->getCustomerLastname()));
        $order->setCustomerMiddlename($this->randomize($order->getCustomerMiddlename()));
        $order->setCustomerEmail($this->randomize($order->getCustomerEmail()));
        $order->setCustomerDob($this->randomize($order->getCustomerDob()));
        $order->setCustomerNote(null);
        $order->setCustomerGender(null);
    }

    /**
     * Nullifies / hashes order address object data.
     * @param OrderAddressInterface $addr
     * @return void
     */
    private function nullifyBillingAddress(OrderAddressInterface $addr)
    {
        $addr->setCity(null);
        $addr->setPostcode(null);
        $addr->setStreet(null);
        $addr->setCompany($this->randomize($addr->getCompany()));
        $addr->setFirstname($this->randomize($addr->getFirstname()));
        $addr->setMiddlename($this->randomize($addr->getMiddlename()));
        $addr->setLastname($this->randomize($addr->getLastname()));
        $addr->setFax($this->randomize($addr->getFax()));
        $addr->setPrefix($this->randomize($addr->getPrefix()));
        $addr->setTelephone($this->randomize($addr->getTelephone()));
        $addr->setVatId(null);
    }

    /**
     * Nullifies / hashes address object data.
     * @param AddressInterface $addr
     * @return void
     */
    private function nullifyAddress(AddressInterface $addr)
    {
        $addr->setCity(null);
        $addr->setPostcode(null);
        $addr->setStreet(null);
        $addr->setCompany($this->randomize($addr->getCompany()));
        $addr->setFirstname($this->randomize($addr->getFirstname()));
        $addr->setMiddlename($this->randomize($addr->getMiddlename()));
        $addr->setLastname($this->randomize($addr->getLastname()));
        $addr->setFax($this->randomize($addr->getFax()));
        $addr->setPrefix($this->randomize($addr->getPrefix()));
        $addr->setTelephone($this->randomize($addr->getTelephone()));
        $addr->setVatId(null);
    }

    /**
     * Hashes given string. If string is null, null is returned.
     * @param String|null $str
     * @param int $length
     * @return string|null
     */
    private function randomize(string $str, $length = 10)
    {
        if ($str == null) {
            return null;
        }

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
