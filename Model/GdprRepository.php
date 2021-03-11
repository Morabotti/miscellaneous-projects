<?php
namespace Ves\Gdpr\Model;

use Exception;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsFactory;
use Magento\Framework\Api\SortOrder;
use Magento\Framework\Exception\AlreadyExistsException;
use Magento\Framework\Exception\NoSuchEntityException;
use Ves\Gdpr\Api\GdprRepositoryInterface;
use Ves\Gdpr\Model\ResourceModel\GdprRequest\Collection;
use Ves\Gdpr\Model\ResourceModel\GdprRequest\Collection as GdprRequestCollection;
use Ves\Gdpr\Model\ResourceModel\GdprRequest\CollectionFactory;

class GdprRepository implements GdprRepositoryInterface
{
    /** @var GdprRequestFactory */
    private $gdprRequestFactory;

    /** @var CollectionFactory */
    private $gdprRequestCollectionFactory;

    /** @var SearchResultsFactory */
    private $searchResultFactory;

    /**
     * GdprRequestRepository constructor.
     * @param GdprRequestFactory $gdprRequestFactory
     * @param CollectionFactory $gdprRequestCollectionFactory
     * @param SearchResultsFactory $searchResultInterfaceFactory
     */
    public function __construct(
        GdprRequestFactory $gdprRequestFactory,
        CollectionFactory $gdprRequestCollectionFactory,
        SearchResultsFactory $searchResultInterfaceFactory
    ) {
        $this->gdprRequestFactory = $gdprRequestFactory;
        $this->gdprRequestCollectionFactory = $gdprRequestCollectionFactory;
        $this->searchResultFactory = $searchResultInterfaceFactory;
    }

    /**
     * Creates new empty GdprRequest object.
     * @return GdprRequest
     */
    public function create()
    {
        return $this->gdprRequestFactory->create();
    }

    /**
     * Loads the GdprRequest object with given id.
     * @param integer $id The GdprRequest object id
     * @return GdprRequest The matching GdprRequest object.
     * @throws NoSuchEntityException If there is no GdprRequest object with given id.
     */
    public function getById($id)
    {
        $gdprRequest = $this->gdprRequestFactory->create();
        $gdprRequest->getResource()->load($gdprRequest, $id);

        if (!$gdprRequest->getId()) {
            throw new NoSuchEntityException(__('Unable to find GdprRequest with ID "%1"', $id));
        }

        return $gdprRequest;
    }

    /**
     * Saves the given GdprRequest object to the database.
     * @param GdprRequest $gdprRequest The object to be saved
     * @return GdprRequest The saved object
     * @throws AlreadyExistsException
     */
    public function save(GdprRequest $gdprRequest)
    {
        $gdprRequest->getResource()->save($gdprRequest);
        return $gdprRequest;
    }

    /**
     * Deletes the given GdprRequest from the database
     * @param GdprRequest $gdprRequest
     * @throws Exception
     */
    public function delete(GdprRequest $gdprRequest)
    {
        $gdprRequest->getResource()->delete($gdprRequest);
    }

    /**
     * Returns the collection of GdprRequest objects that match given search criteria.
     * @param SearchCriteriaInterface $searchCriteria The search criteria the GdprRequest objects need to fulfill to be included in the collection.
     * @return GdprRequestCollection The collection containing matching GdprRequest objects.
     */
    public function getList(SearchCriteriaInterface $searchCriteria)
    {
        $collection = $this->gdprRequestCollectionFactory->create();

        $this->addFiltersToCollection($searchCriteria, $collection);
        $this->addSortOrdersToCollection($searchCriteria, $collection);
        $this->addPagingToCollection($searchCriteria, $collection);

        $collection->load();

        return $this->buildSearchResult($searchCriteria, $collection);
    }

    /**
     * Creates GdprRequest and populates data from array.
     * @param array $data
     * @return GdprRequest
     */
    public function of(array $data)
    {
        $gdprRequest = $this->gdprRequestFactory->create();

        $gdprRequest->setFirstName($data['firstname']);
        $gdprRequest->setLastName($data['lastname']);
        $gdprRequest->setEmail($data['email']);
        $gdprRequest->setPhone($data['telephone']);

        return $gdprRequest;
    }

    /**
     * Adds the given filter to the collection.
     * @param SearchCriteriaInterface $searchCriteria The criteria containing the filter to be used.
     * @param GdprRequestCollection $collection The collection to which the filter is to be added.
     */
    private function addFiltersToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        foreach ($searchCriteria->getFilterGroups() as $filterGroup) {
            $fields = $conditions = [];
            foreach ($filterGroup->getFilters() as $filter) {
                $fields[] = $filter->getField();
                $conditions[] = [$filter->getConditionType() => $filter->getValue()];
            }
            $collection->addFieldToFilter($fields, $conditions);
        }
    }

    /**
     * Adds the given sort order to the collection.
     * @param SearchCriteriaInterface $searchCriteria The criteria containing the sort order to be used.
     * @param GdprRequestCollection $collection The collection to which the sort order is to be added.
     */
    private function addSortOrdersToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        foreach ((array) $searchCriteria->getSortOrders() as $sortOrder) {
            $direction = $sortOrder->getDirection() == SortOrder::SORT_ASC ? 'asc' : 'desc';
            $collection->addOrder($sortOrder->getField(), $direction);
        }
    }

    /**
     * Adds the given paging to the collection.
     * @param SearchCriteriaInterface $searchCriteria The criteria containing the paging to be used.
     * @param GdprRequestCollection $collection The collection to which the paging is to be added.
     */
    private function addPagingToCollection(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        $collection->setPageSize($searchCriteria->getPageSize());
        $collection->setCurPage($searchCriteria->getCurrentPage());
    }
    /**
     * Creates the search results from the collection.
     * @param SearchCriteriaInterface $searchCriteria The criteria used with the collection.
     * @param GdprRequestCollection $collection The collection from which to get the search results.
     * @return mixed
     */
    private function buildSearchResult(SearchCriteriaInterface $searchCriteria, Collection $collection)
    {
        $searchResults = $this->searchResultFactory->create();

        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        $searchResults->setTotalCount($collection->getSize());

        return $searchResults;
    }
}
