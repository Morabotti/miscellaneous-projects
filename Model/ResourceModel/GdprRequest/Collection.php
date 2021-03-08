<?php
namespace Ves\Gdpr\Model\ResourceModel\GdprRequest;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected $_idFieldName = 'entity_id';
    protected $_eventPrefix = 'ves_gdpr_collection';
    protected $_eventObject = 'gdpr_collection';

    /**
     * Define resource model
     * @return void
     */
    protected function _construct()
    {
        $this->_init('Ves\Gdpr\Model\GdprRequest', 'Ves\Gdpr\Model\ResourceModel\GdprRequest');
    }
}
