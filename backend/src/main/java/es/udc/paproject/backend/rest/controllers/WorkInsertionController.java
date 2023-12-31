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

    @PostMapping()
    ResponseEntity<WorkInsertionDto> createWorkInsertion(@RequestBody WorkInsertionDto workInsertionDto) {
        return ResponseEntity.ok(toWorkInsertionDto(workInsertionService.createWorkInsertion(workInsertionDto)));
    }

    @GetMapping()
    ResponseEntity<BlockDto<WorkInsertionDto>> getWorkInsertion(
            @RequestParam(required = false) Long idParticipant,
            @RequestParam(defaultValue = "0") int page) {

        Block<WorkInsertion> workInsertionBlock = workInsertionService.getWorkInsertions(idParticipant, page, 100);

        return ResponseEntity.ok(new BlockDto<>(toWorkInsertionDtos(workInsertionBlock.getItems()), workInsertionBlock.getExistMoreItems()));
    }

    @PutMapping()
    ResponseEntity<WorkInsertionDto> updateWorkInsertion(@RequestBody WorkInsertionDto workInsertionDto) {
        return ResponseEntity.ok(toWorkInsertionDto(workInsertionService.updateWorkInsertion(workInsertionDto)));
    }

    @DeleteMapping()
    ResponseEntity<Void> deleteWorkInsertion(@RequestParam Long idWorkInsertion) {

        workInsertionService.deleteWorkInsertion(idWorkInsertion);
        return ResponseEntity.noContent().build();
    }
}
