<?php
namespace Ves\Gdpr\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
use Magento\Framework\Model\ResourceModel\Db\Context;

class GdprRequest extends AbstractDb
{
    public function __construct(Context $context)
    {
        parent::__construct($context);
    }
    protected function _construct()
    {
        $this->_init('ves_gdpr', 'entity_id');
    }
}
