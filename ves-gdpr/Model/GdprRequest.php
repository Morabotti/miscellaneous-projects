<?php
namespace Ves\Gdpr\Model;

use Magento\Framework\DataObject\IdentityInterface;
use Magento\Framework\Model\AbstractModel;

class GdprRequest extends AbstractModel implements IdentityInterface
{
    const CACHE_TAG = 'ves_gdpr';
    protected $_cacheTag = 'ves_gdpr';
    protected $_eventPrefix = 'ves_gdpr';

    protected function _construct()
    {
        $this->_init('Ves\Gdpr\Model\ResourceModel\GdprRequest');
    }
    public function getIdentities()
    {
        return [self::CACHE_TAG . '_' . $this->getId()];
    }
    public function getDefaultValues()
    {
        return [];
    }
}