<?php
namespace Ves\Gdpr\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Framework\Api\SearchCriteriaInterface;
use Ves\Gdpr\Model\ResourceModel\GdprRequest\Collection as GdprRequestCollection;
use Ves\Gdpr\Api\GdprRepositoryInterface;

class Listing extends Template
{
    /** @var SearchCriteriaInterface */
    protected $searchCriteria;

    /** @var GdprRepositoryInterface */
    protected $gdprRepository;

    public function __construct(
        Template\Context $context,
        SearchCriteriaInterface $searchCriteria,
        GdprRepositoryInterface $gdprRepository,
        array $data = []
    ) {
        $this->searchCriteria = $searchCriteria;
        $this->gdprRepository = $gdprRepository;
        parent::__construct($context, $data);
    }

    /**
     * This method returns collection of gdpr requests
     * @return GdprRequestCollection
     */
    public function getGdprRequests()
    {
        return $this->gdprRepository->getList($this->searchCriteria);
    }
}
