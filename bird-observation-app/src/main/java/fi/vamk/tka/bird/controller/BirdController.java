package fi.vamk.tka.bird.controller;

import java.io.FileReader;
import java.util.Iterator;

import com.fasterxml.jackson.databind.ObjectMapper;

import fi.vamk.tka.bird.model.Bird;
import fi.vamk.tka.bird.repo.BirdRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bird")
public class BirdController {
    @Autowired
    private BirdRepository birdRepository;

    @GetMapping
    public Iterable<Bird> getAll() {
        return birdRepository.findAll();
    }

    @GetMapping("/import")
    public String importBirds() {
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(new FileReader("bird.json"));
            JSONArray birds = (JSONArray) obj;
            Iterator<JSONObject> iterator = birds.iterator();

            while (iterator.hasNext()) {
                JSONObject bird = (JSONObject) iterator.next();
                ObjectMapper mapper = new ObjectMapper();
                Bird b = mapper.readValue(bird.toString(), Bird.class);
                birdRepository.save(b);
            }
            return "Import successful";
        } catch (Exception e) {
            return "Import failed " + e.toString();
        }
    }
}
