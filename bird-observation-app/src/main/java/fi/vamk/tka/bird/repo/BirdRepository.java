package fi.vamk.tka.bird.repo;

import fi.vamk.tka.bird.model.Bird;
import org.springframework.data.repository.CrudRepository;

public interface BirdRepository extends CrudRepository<Bird, Integer> {

}
