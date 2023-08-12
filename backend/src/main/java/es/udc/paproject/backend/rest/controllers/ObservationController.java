package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.ObservationService;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.GetObservationParams;
import es.udc.paproject.backend.rest.dtos.ObservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static es.udc.paproject.backend.rest.dtos.ObservationConversor.toObservationDto;
import static es.udc.paproject.backend.rest.dtos.ObservationConversor.toObservationDtos;

@RestController
@RequestMapping("/observation")
public class ObservationController {

    @Autowired
    private ObservationService observationService;

    @PostMapping("/create")
    ResponseEntity<ObservationDto> createObsevation(@RequestBody ObservationDto observationDto){
        return ResponseEntity.ok(toObservationDto(observationService.createObsevation(observationDto)));
    }
    @PostMapping("/get")
    ResponseEntity<BlockDto<ObservationDto>> getObservations(
            @RequestBody GetObservationParams observationParams){

        int OBSERVATION_PAGE_SIZE = 5;
        Block<Observation> observationBlock = observationService.getObservations(observationParams.getIdParticipant(),
                observationParams.getPage(), OBSERVATION_PAGE_SIZE, observationParams.getStartDate(),
                observationParams.getEndDate(), observationParams.getTypes());

        return ResponseEntity.ok(new BlockDto<>(toObservationDtos(observationBlock.getItems()),
                observationBlock.getExistMoreItems()));
    }

    @PutMapping("/update")
    ResponseEntity<ObservationDto> updateObservation(@RequestBody ObservationDto observationDto){
        return ResponseEntity.ok(toObservationDto(observationService.updateObservation(observationDto)));
    }
    @DeleteMapping("/delete")
    ResponseEntity<Void> deleteObservation(@RequestParam Long idObservation){

        observationService.deleteObservation(idObservation);
        return ResponseEntity.noContent().build();
    }
}
