package nl.acme.wandelen.persistence;

import nl.acme.wandelen.domain.Wandeling;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WandelingRepository extends CrudRepository<Wandeling, Long> {

}
