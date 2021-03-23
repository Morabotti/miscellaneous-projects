<?php

namespace Ves\Gdpr\Controller\Adminhtml\Show;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Customer\Api\CustomerRepositoryInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\ResponseInterface;
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

                // $this->clearCustomer($gdprRequest);
                // $this->clearOrders($gdprRequest);
                // $this->clearQuotes($gdprRequest);

                $gdprRequest->setHandled(date('Y-m-d H:i:s'));
                $this->gdprRepository->save($gdprRequest);

                $this->messageManager->addSuccessMessage('Successfully handled GDPR request.');
                return $this->_redirect('gdpr/show', ['id' => $gdprRequest->getId()]);
            } catch (\Exception $e) {
                $this->messageManager->addErrorMessage('No GDPR request found.');
                return $this->_redirect('gdpr/listing');
            }
        }

        return $this->_redirect('gdpr/listing');
    }

    private function clearCustomer(GdprRequest $gdprRequest)
    {
        $customer = $this->customerRepository->get($gdprRequest->getEmail());
        $addresses = $customer->getAddresses();

        if ($addresses) {
            foreach ($addresses as $addr) {
                $this->nullifyAddress($addr);
            }
            $customer->setAddresses($addresses);
        }

        $customer->setFirstname($this->shaHash($customer->getFirstname()));
        $customer->setMiddlename($this->shaHash($customer->getMiddlename()));
        $customer->setLastname($this->shaHash($customer->getLastname()));
        $customer->setEmail($this->shaHash($customer->getEmail()));
        $customer->setPrefix(null);
        $customer->setDefaultBilling(null);
        $customer->setDefaultShipping(null);
        $customer->setDob(null);

        $this->customerRepository->save($customer);
    }

    private function clearOrders(GdprRequest $gdprRequest)
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

    private function clearQuotes(GdprRequest $gdprRequest)
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

    private function nullifyOrder(OrderInterface $order)
    {
        $billingAddr = $order->getBillingAddress();

        if ($billingAddr) {
            $this->nullifyBillingAddress($billingAddr);
            $order->setBillingAddress($billingAddr);
        }

        $order->setCustomerFirstname($this->shaHash($order->getCustomerFirstname()));
        $order->setCustomerLastname($this->shaHash($order->getCustomerLastname()));
        $order->setCustomerMiddlename($this->shaHash($order->getCustomerMiddlename()));
        $order->setCustomerEmail($this->shaHash($order->getCustomerEmail()));
        $order->setCustomerDob($this->shaHash($order->getCustomerDob()));
        $order->setCustomerNote(null);
        $order->setCustomerGender(null);
    }

    private function nullifyBillingAddress(OrderAddressInterface $addr)
    {
        $addr->setCity(null);
        $addr->setPostcode(null);
        $addr->setStreet(null);
        $addr->setCompany($this->shaHash($addr->getCompany()));
        $addr->setFirstname($this->shaHash($addr->getFirstname()));
        $addr->setMiddlename($this->shaHash($addr->getMiddlename()));
        $addr->setLastname($this->shaHash($addr->getLastname()));
        $addr->setFax($this->shaHash($addr->getFax()));
        $addr->setPrefix($this->shaHash($addr->getPrefix()));
        $addr->setTelephone($this->shaHash($addr->getTelephone()));
        $addr->setVatId(null);
    }

    private function nullifyAddress(AddressInterface $addr)
    {
        $addr->setCity(null);
        $addr->setPostcode(null);
        $addr->setStreet(null);
        $addr->setCompany($this->shaHash($addr->getCompany()));
        $addr->setFirstname($this->shaHash($addr->getFirstname()));
        $addr->setMiddlename($this->shaHash($addr->getMiddlename()));
        $addr->setLastname($this->shaHash($addr->getLastname()));
        $addr->setFax($this->shaHash($addr->getFax()));
        $addr->setPrefix($this->shaHash($addr->getPrefix()));
        $addr->setTelephone($this->shaHash($addr->getTelephone()));
        $addr->setVatId(null);
    }

    private function shaHash($str)
    {
        if ($str == null) {
            return null;
        }

        return hash("sha256", $str, false);
    }
}
