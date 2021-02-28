<?php
namespace Ves\Gdpr\Controller\Form;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;

class Index extends Action
{
    public function __construct(
        Context $context
    ) {
        parent::__construct($context);
    }

    public function execute()
    {
        $this->_view->loadLayout();
        $this->_view->renderLayout();
    }
}
