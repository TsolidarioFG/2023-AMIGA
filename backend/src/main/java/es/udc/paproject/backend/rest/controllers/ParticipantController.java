package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.rest.dtos.StatisticsDto;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.ParticipantService;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    ResponseEntity<ParticipantDto> saveParticipant(@RequestBody @Validated ParticipantDto participantDto) {
        return ResponseEntity.ok(participantService.saveParticipant(participantDto));
    }

    @PostMapping("/saveAnnualData")
    ResponseEntity<ParticipantDto> newAnnualData(@RequestBody @Validated ParticipantDto participantDto) {
        return ResponseEntity.ok(participantService.saveAnnualData(participantDto));
    }

    @PutMapping("/update")
    ResponseEntity<ParticipantDto> updateParticipant(@RequestBody ParticipantDto participantDto) {
        ParticipantDto participantDto1 = participantService.updateParticipant(participantDto);

        if (participantDto1 == null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(participantDto1);
    }

    @GetMapping("/downloadExcel")
    public ResponseEntity<Resource> downloadExcel(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                  @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<StatisticsDto> statisticsDtos = participantService.getExcelData(startDate, endDate);

        String[] headers = {"fecha", "programa", "situacion", "retornado", "pi", "dni/nie/pas", "nombre", "apellidos", "edad",
                "fecha nacimiento", "genero", "pais origen", "municipio", "provincia", "telefono", "correo",
                "nivel de estudios", "situacion laboral", "numero inserciones"};

        try (Workbook workbook = WorkbookFactory.create(true)) {
            Sheet sheet = workbook.createSheet("Datos");
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Create header row
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerCellStyle);
            }

            // Create data rows
            int rowIndex = 1;
            for (StatisticsDto statisticsDto : statisticsDtos) {
                Row row = sheet.createRow(rowIndex++);

                int cellIndex = 0;

                Cell cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getPrograms());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getSituation());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getReturned());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getPi());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getDocument());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getName());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getSurnames());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getYear());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getBirthdate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getSex());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getCountry());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getMunicipality());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getProvince());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getPhone());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getEmail());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getStudies());
                cell = row.createCell(cellIndex++);
                cell.setCellValue(statisticsDto.getWorkSituation());
                cell = row.createCell(cellIndex);
                cell.setCellValue(statisticsDto.getNumberInsertion());
            }

            // parte nacionalidades

            rowIndex += 3;

            Row row = sheet.createRow(rowIndex++);
            Cell cell = row.createCell(0);
            cell.setCellValue("Hombres");
            cell.setCellStyle(headerCellStyle);
            cell = row.createCell(4);
            cell.setCellValue("Mujeres");
            cell.setCellStyle(headerCellStyle);
            row = sheet.createRow(rowIndex++);
            cell = row.createCell(0);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Nacionalidad");
            cell = row.createCell(1);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Número");
            cell = row.createCell(4);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Nacionalidad");
            cell = row.createCell(5);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Número");

            int memoryIndex = rowIndex;
            for( Map.Entry<String, Integer> entry : statisticsDtos.get(0).getNationalitiesCountMen().entrySet()) {
                row = sheet.createRow(rowIndex++);
                cell = row.createCell(0);
                cell.setCellValue(entry.getKey());
                cell = row.createCell(1);
                cell.setCellValue(entry.getValue());
            }

            for( Map.Entry<String, Integer> entry : statisticsDtos.get(0).getNationalitiesCountWoman().entrySet()) {
                row = sheet.createRow(memoryIndex++);
                cell = row.createCell(4);
                cell.setCellValue(entry.getKey());
                cell = row.createCell(5);
                cell.setCellValue(entry.getValue());
            }

            // parte factores exclusion

            rowIndex += 3;

            row = sheet.createRow(rowIndex++);
            cell = row.createCell(0);
            cell.setCellValue("Hombres");
            cell.setCellStyle(headerCellStyle);
            cell = row.createCell(4);
            cell.setCellValue("Mujeres");
            cell.setCellStyle(headerCellStyle);
            row = sheet.createRow(rowIndex++);
            cell = row.createCell(0);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Factor exclusión");
            cell = row.createCell(1);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Número");
            cell = row.createCell(4);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Factor exclusión");
            cell = row.createCell(5);
            cell.setCellStyle(headerCellStyle);
            cell.setCellValue("Número");

            memoryIndex = rowIndex;
            for( Map.Entry<String, Integer> entry : statisticsDtos.get(0).getExclusionFactorCountMen().entrySet()) {
                row = sheet.createRow(rowIndex++);
                cell = row.createCell(0);
                cell.setCellValue(entry.getKey());
                cell = row.createCell(1);
                cell.setCellValue(entry.getValue());
            }

            for( Map.Entry<String, Integer> entry : statisticsDtos.get(0).getExclusionFactorCountWoman().entrySet()) {
                row = sheet.createRow(memoryIndex++);
                cell = row.createCell(4);
                cell.setCellValue(entry.getKey());
                cell = row.createCell(5);
                cell.setCellValue(entry.getValue());
            }




            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Write the Excel data to a byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            byte[] excelBytes = outputStream.toByteArray();

            // Create a ByteArrayResource from the byte array
            Resource excelResource = new ByteArrayResource(excelBytes);

            HttpHeaders head = new HttpHeaders();
            head.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            head.setContentDispositionFormData("attachment", "data.xlsx");

            return new ResponseEntity<>(excelResource, head, HttpStatus.OK);
        } catch (
                IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
