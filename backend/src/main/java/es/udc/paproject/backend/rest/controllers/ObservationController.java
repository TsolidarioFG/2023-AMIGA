package es.udc.paproject.backend.rest.controllers;

import static es.udc.paproject.backend.rest.dtos.ObservationConversor.toObservationDto;
import static es.udc.paproject.backend.rest.dtos.ObservationConversor.toObservationDtos;

import es.udc.paproject.backend.model.services.ObservationService;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.ObservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/observation")
public class ObservationController {

    @Autowired
    private ObservationService observationService;

    @PostMapping("/create")
    ResponseEntity<ObservationDto> createObsevation(@RequestBody ObservationDto observationDto){
        return ResponseEntity.ok(toObservationDto(observationService.createObsevation(observationDto)));
    }
    @GetMapping("/get")
    ResponseEntity<BlockDto<ObservationDto>> getObservations(
            @RequestParam(required=false) Long idParticipant,
            @RequestParam(defaultValue="0") int page){

        //Block<Observation> observationBlock = observationService.getObservations(idParticipant, page, 4);

        //return ResponseEntity.ok(new BlockDto<>(toObservationDtos(observationBlock.getItems()), observationBlock.getExistMoreItems()));
        return null;
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
