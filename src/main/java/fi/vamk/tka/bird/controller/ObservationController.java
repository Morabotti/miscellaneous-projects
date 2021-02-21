package fi.vamk.tka.bird.controller;

import fi.vamk.tka.bird.model.Observation;
import fi.vamk.tka.bird.repo.ObservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/observation")
public class ObservationController {
    @Autowired
    private ObservationRepository observationRepository;

    @GetMapping
    public Iterable<Observation> getObservations() {
        return observationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Observation> getObservation(@PathVariable("id") Integer id) {
        return observationRepository.findById(id);
    }

    @PostMapping
    public Observation createObservation(@RequestBody Observation observation) {
        return observationRepository.save(observation);
    }

    @PutMapping("/{id}")
    public Observation updateObservation(@RequestBody Observation observation) {
        return observationRepository.save(observation);
    }

    @DeleteMapping("/{id}")
    public void deleteObservation(@PathVariable("id") Integer id) {
        observationRepository.deleteById(id);
    }
}
