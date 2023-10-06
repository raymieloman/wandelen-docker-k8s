package nl.acme.wandelen.api;

import nl.acme.wandelen.domain.Wandeling;
import nl.acme.wandelen.service.WandelingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("api/wandelings")
public class WandelingController {

	@Autowired
	private WandelingService wandelingService;

	@GetMapping
	public ResponseEntity<Iterable<Wandeling>> list() {
		return ResponseEntity.ok(wandelingService.findAll());
	}

	@PostMapping
	public ResponseEntity<Wandeling> create(@RequestBody Wandeling wandeling) {
		return ResponseEntity.ok(this.wandelingService.save(wandeling));
	}

	@GetMapping("{id}")
	public ResponseEntity<Wandeling> findById(@PathVariable long id) {
		Optional<Wandeling> optionalWandeling = this.wandelingService.findById(id);
		if(optionalWandeling.isPresent()) {
			return ResponseEntity.ok(optionalWandeling.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("{id}")
	public ResponseEntity<Wandeling> updateById(@PathVariable long id, @RequestBody Wandeling source) {
		Optional<Wandeling> optionalWandeling = this.wandelingService.findById(id);
		if(optionalWandeling.isPresent()) {
			Wandeling target = optionalWandeling.get();
			target.setName(source.getName());
			target.setStart(source.getStart());
			target.setFinish(source.getFinish());
			target.setReview(source.getReview());

			return ResponseEntity.ok(this.wandelingService.save(target));
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> deleteById(@PathVariable long id) {
		Optional<Wandeling> optionalWandeling = this.wandelingService.findById(id);
		if(optionalWandeling.isPresent()) {
			this.wandelingService.deleteById(id);

			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
