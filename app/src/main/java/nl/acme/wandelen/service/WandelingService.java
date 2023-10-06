package nl.acme.wandelen.service;

import nl.acme.wandelen.domain.Wandeling;
import nl.acme.wandelen.persistence.WandelingRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class WandelingService {

	@Autowired
	private WandelingRepository wandelingRepository;

	public Iterable<Wandeling> findAll() {
		return wandelingRepository.findAll();
	}

	@Transactional
	public Wandeling save(Wandeling wandeling) {
		return wandelingRepository.save(wandeling);
	}

	public Optional<Wandeling> findById(long id) {
		return wandelingRepository.findById(id);
	}

	@Transactional
	public void deleteById(long id) {
		wandelingRepository.deleteById(id);
	}
}
