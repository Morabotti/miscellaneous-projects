<?php
namespace Ves\Gdpr\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Ves\Gdpr\Api\GdprRepositoryInterface;
use Ves\Gdpr\Model\GdprRequest;

class Show extends Template
{
    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    public function __construct(
        Template\Context $context,
        GdprRepositoryInterface $gdprRepository,
        array $data = []
    ) {
        $this->gdprRepository = $gdprRepository;
        parent::__construct($context, $data);
    }

    /**
     * This method returns the gdprRequest with given id
     * @param int $id
     * @return GdprRequest|null
     */
    public function getGdprRequest(int $id)
    {
        try {
            return $this->gdprRepository->getById($id);
        } catch (\Exception $e) {
            return null;
        }
    }
}
