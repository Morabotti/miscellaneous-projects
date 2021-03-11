<?php
namespace Ves\Gdpr\Controller\Form;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
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

    public function execute()
    {
        $post = (array)$this->getRequest()->getPost();

        if (!empty($post)) {
            $reclamation = $this->reclamationRepository->of($post);
            $this->reclamationRepository->save($reclamation);

            $this->messageManager->addSuccessMessage("Your reclamation has been saved! ");
            return $this->resultFactory->create(ResultFactory::TYPE_REDIRECT)->setUrl("/");
        }

        $this->_view->loadLayout();
        $this->_view->renderLayout();
    }
}
