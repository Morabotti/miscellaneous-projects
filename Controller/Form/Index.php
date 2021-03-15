<?php
namespace Ves\Gdpr\Controller\Form;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Exception\AlreadyExistsException;
use Ves\Gdpr\Api\GdprRepositoryInterface;

class Index extends Action
{
    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    public function __construct(
        Context $context,
        GdprRepositoryInterface $gdprRepository
    ) {
        $this->gdprRepository = $gdprRepository;
        parent::__construct($context);
    }

    /**
     * Execute view action
     * @return ResultFactory | void
     */
    public function execute()
    {
        $post = (array)$this->getRequest()->getPost();

        if (!empty($post)) {
            try {
                $reclamation = $this->gdprRepository->of($post);
                $this->gdprRepository->save($reclamation);

                $this->messageManager->addSuccessMessage("Your GDPR request has been saved!");
                return $this->resultFactory->create(ResultFactory::TYPE_REDIRECT)->setUrl("/");
            } catch (AlreadyExistsException $e) {
                $this->messageManager->addErrorMessage(
                    "Your GDPR request failed to sent. Please contact customer service"
                );
            }
        }

        $this->_view->loadLayout();
        $this->_view->renderLayout();
    }
}
