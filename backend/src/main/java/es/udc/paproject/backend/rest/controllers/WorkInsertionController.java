package es.udc.paproject.backend.rest.controllers;

import static es.udc.paproject.backend.rest.dtos.WorkInsertionConversor.toWorkInsertionDto;
import static es.udc.paproject.backend.rest.dtos.WorkInsertionConversor.toWorkInsertionDtos;

import es.udc.paproject.backend.model.entities.WorkInsertion;
import es.udc.paproject.backend.model.services.Block;
import es.udc.paproject.backend.model.services.WorkInsertionService;
import es.udc.paproject.backend.rest.dtos.BlockDto;
import es.udc.paproject.backend.rest.dtos.WorkInsertionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/work")
public class WorkInsertionController {

    @Autowired
    private WorkInsertionService workInsertionService;

    @PostMapping("/create")
    ResponseEntity<WorkInsertionDto> createObsevation(@RequestBody WorkInsertionDto workInsertionDto) {
        return ResponseEntity.ok(toWorkInsertionDto(workInsertionService.createWorkInsertion(workInsertionDto)));
    }

    @GetMapping("/get")
    ResponseEntity<BlockDto<WorkInsertionDto>> getObservations(
            @RequestParam(required = false) Long idParticipant,
            @RequestParam(defaultValue = "0") int page) {

        Block<WorkInsertion> workInsertionBlock = workInsertionService.getWorkInsertions(idParticipant, page, 4);

        return ResponseEntity.ok(new BlockDto<>(toWorkInsertionDtos(workInsertionBlock.getItems()), workInsertionBlock.getExistMoreItems()));
    }

    @PutMapping("/update")
    ResponseEntity<WorkInsertionDto> updateObservation(@RequestBody WorkInsertionDto workInsertionDto) {
        return ResponseEntity.ok(toWorkInsertionDto(workInsertionService.updateWorkInsertion(workInsertionDto)));
    }

    @DeleteMapping("/delete")
    ResponseEntity<Void> deleteObservation(@RequestParam Long idObservation) {

        workInsertionService.deleteWorkInsertion(idObservation);
        return ResponseEntity.noContent().build();
    }
}
