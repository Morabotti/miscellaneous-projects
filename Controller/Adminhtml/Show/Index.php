<?php
namespace Ves\Gdpr\Controller\Adminhtml\Show;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Controller\ResultInterface;
use Magento\Framework\View\Result\Page;
use Magento\Framework\View\Result\PageFactory;
use Ves\Gdpr\Api\GdprRepositoryInterface;

class Index extends Action implements HttpGetActionInterface
{
    /** @var PageFactory */
    protected $resultPageFactory;

    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    public function __construct(
        Context $context,
        PageFactory $resultPageFactory,
        GdprRepositoryInterface $gdprRepository
    ) {
        $this->resultPageFactory = $resultPageFactory;
        $this->gdprRepository = $gdprRepository;
        parent::__construct($context);
    }

    /**
     * Execute view action
     * @return ResultInterface
     */
    public function execute()
    {
        $get = (array)$this->getRequest()->getParams();

        if (isset($get['id'])) {
            try {
                $this->gdprRepository->getById($get['id']);

                return $this->resultPageFactory->create();
            } catch (\Exception $e) {

            }
        }
    }
}
