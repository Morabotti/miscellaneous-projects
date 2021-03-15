<?php

namespace Ves\Gdpr\Controller\Adminhtml\Show;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\View\Result\PageFactory;
use Ves\Gdpr\Api\GdprRepositoryInterface;

class Delete extends Action implements HttpGetActionInterface
{
    /** @var PageFactory */
    protected $resultPageFactory;

    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    public function __construct(
        Context $context,
        GdprRepositoryInterface $gdprRepository,
        PageFactory $resultPageFactory
    ) {
        $this->gdprRepository = $gdprRepository;
        $this->resultPageFactory = $resultPageFactory;
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

                $gdprRequest->setHandled(date('Y-m-d H:i:s'));

                if (!$gdprRequest->getHandled()) {
                    $this->messageManager->addErrorMessage('GDPR request has already been accepted.');
                    return $this->_redirect('gdpr/show', ['id' => $gdprRequest->getId()]);
                }

                $this->gdprRepository->delete($gdprRequest);
                $this->messageManager->addSuccessMessage('Successfully deleted GDPR request.');
            } catch (\Exception $e) {
                $this->messageManager->addErrorMessage('No GDPR request found.');
            }
        }

        return $this->_redirect('gdpr/listing');
    }
}
