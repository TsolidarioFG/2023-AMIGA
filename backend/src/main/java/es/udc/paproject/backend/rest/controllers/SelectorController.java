package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.services.SelectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/selector")
public class SelectorController {

    @Autowired
    private SelectorService selectorService;

    @GetMapping("/countries")
    ResponseEntity<List<Country>> getCountries() {
        return ResponseEntity.ok(selectorService.getCountries());
    }
    @GetMapping("/provinces")
    ResponseEntity<List<Province>> getProvinces() {
        return ResponseEntity.ok(selectorService.getProvinces());
    }
    @GetMapping("/municipalities")
    ResponseEntity<List<Municipality>> getMunicipalities() {
        return ResponseEntity.ok(selectorService.getMunicipalities());
    }
    @GetMapping("/languages")
    ResponseEntity<List<Language>> getLanguages() {
        return ResponseEntity.ok(selectorService.getLanguages());
    }
    @GetMapping("/employments")
    ResponseEntity<List<Employment>> getEmploymentSituations() {
        return ResponseEntity.ok(selectorService.getEmploymentSituations());
    }
    @GetMapping("/studies")
    ResponseEntity<List<Studies>> getStudies() {
        return ResponseEntity.ok(selectorService.getStudies());
    }
    @GetMapping("/maritalstatus")
    ResponseEntity<List<MaritalStatus>> getMaritalStatus() {
        return ResponseEntity.ok(selectorService.getMaritalStatus());
    }
    @GetMapping("/housings")
    ResponseEntity<List<Housing>> getHousings() {
        return ResponseEntity.ok(selectorService.getHousings());
    }
    @GetMapping("/cohabitations")
    ResponseEntity<List<Cohabitation>> getCohabitation() {
        return ResponseEntity.ok(selectorService.getCohabitation());
    }
    @GetMapping("/exclusions")
    ResponseEntity<List<ExclusionFactor>> getExclusionFactors() {
        return ResponseEntity.ok(selectorService.getExclusionFactors());
    }
    @GetMapping("/programs")
    ResponseEntity<List<Program>> getPrograms() {
        return ResponseEntity.ok(selectorService.getPrograms());
    }
    @GetMapping("/demands")
    ResponseEntity<List<Demand>> getDemands() {
        return ResponseEntity.ok(selectorService.getDemands());
    }
    @GetMapping("/contracts")
    ResponseEntity<List<Contract>> getContracts() {
        return ResponseEntity.ok(selectorService.getContracts());
    }
}
