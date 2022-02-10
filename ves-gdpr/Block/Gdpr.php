<?php
namespace Ves\Gdpr\Block;

use Magento\Framework\View\Element\Template;

class Gdpr extends Template
{
    public function __construct(
        Template\Context $context,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }
}
