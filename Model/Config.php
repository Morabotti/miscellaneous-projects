<?php
namespace Ves\Gdpr\Model;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class Config
{
    protected $config;

    public function __construct(ScopeConfigInterface $config)
    {
        $this->config = $config;
    }

    public function isAutoFillEnabled(): bool
    {
        return $this->config->getValue('ves_gdpr/general/autofill', ScopeInterface::SCOPE_STORE);
    }
}
