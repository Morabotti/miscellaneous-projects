package fi.vamk.tka.bird.repo;

import fi.vamk.tka.bird.model.Observation;
import org.springframework.data.repository.CrudRepository;

public interface ObservationRepository extends CrudRepository<Observation, Integer> {

}
