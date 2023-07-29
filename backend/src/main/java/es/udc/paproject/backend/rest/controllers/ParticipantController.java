package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.ParticipantService;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/participant")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping("/get")
    ResponseEntity<List<ParticipantSummaryDto>> getListParticipants() {
        return ResponseEntity.ok(participantService.getParcipants());
    }

    @GetMapping("/getByDoc")
    ResponseEntity<ParticipantSummaryDto> getParticipantByIdentification(@RequestParam("type") String type,
                                                                         @RequestParam("doc") String doc) throws InstanceNotFoundException {
        return ResponseEntity.ok(participantService.getParcitipantByDocumentation(type, doc));
    }

    @GetMapping("/{id}")
    ResponseEntity<ParticipantDto> getParticipant(@PathVariable Long id,
                                                  @RequestParam("year") int year) {
        return participantService.getParcipipant(id, year).map(
                        ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/save")
    ResponseEntity<ParticipantDto> saveParticipant(@RequestBody @Validated ParticipantDto participantDto){
        return ResponseEntity.ok(participantService.saveParticipant(participantDto));
    }

    @PostMapping("/saveAnnualData")
    ResponseEntity<ParticipantDto> newAnnualData(@RequestBody @Validated ParticipantDto participantDto){
        return ResponseEntity.ok(participantService.saveAnnualData(participantDto));
    }

    @PutMapping("/update")
    ResponseEntity<ParticipantDto> updateParticipant(@RequestBody ParticipantDto participantDto){
        ParticipantDto participantDto1 = participantService.updateParticipant(participantDto);

        if(participantDto1 == null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(participantDto1);
    }

    @GetMapping("/Excel")
    ResponseEntity<Resource> getExcel(LocalDate startDate, LocalDate endDate) {
       // roomService.getExcel(officeId.longValue(), date);

        Path path = Paths.get("./resources/excel/Excel.xls");
        ByteArrayResource resource = null;
        try {
            resource = new ByteArrayResource(Files.readAllBytes(path));
        } catch ( IOException e) {
            throw new RuntimeException(e);
        }

        //HEADERS
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=estadisticas.xls");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

    }
}
