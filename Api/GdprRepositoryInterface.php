<?php
namespace Ves\Gdpr\Api;

use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Exception\AlreadyExistsException;
use Magento\Framework\Exception\NoSuchEntityException;
use Ves\Gdpr\Model\GdprRequest;
use Ves\Gdpr\Model\ResourceModel\GdprRequest\Collection as GdprRequestCollection;

interface GdprRepositoryInterface
{
    /**
     * Creates new empty GdprRequest object.
     * @return GdprRequest
     */
    public function create();

    /**
     * Loads the GdprRequest object with given id.
     * @param integer $id The GdprRequest object id
     * @return GdprRequest The matching Reclamation object.
     */
    public function getById($id);

    /**
     * Saves the given GdprRequest object to the database.
     * @param GdprRequest $gdprRequest The object to be saved
     * @return GdprRequest The saved object
     * @throws NoSuchEntityException If there is no Reclamation object with given id.
     */
    public function save(GdprRequest $gdprRequest);

    /**
     * Deletes the given GdprRequest from the database
     * @param GdprRequest $gdprRequest
     */
    public function delete(GdprRequest $gdprRequest);

    /**
     * Returns the collection of GdprRequest objects that match given search criteria.
     * @param SearchCriteriaInterface $searchCriteria The search criteria the GdprRequest objects need to fulfill to be included in the collection.
     * @return GdprRequestCollection The collection containing matching GdprRequest objects.
     */
    public function getList(SearchCriteriaInterface $searchCriteria);

    /**
     * Creates gdpr request and populates data from array.
     * @param array $data
     * @return GdprRequest
     */
    public function of(array $data);
}
