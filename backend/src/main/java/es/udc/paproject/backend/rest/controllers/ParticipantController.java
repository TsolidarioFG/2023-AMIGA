package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.rest.dtos.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.ParticipantService;
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
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDto> getStatistics(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                       @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok( participantService.getStatistics(startDate, endDate));
    }

    @GetMapping("/downloadExcel")
    public ResponseEntity<Resource> downloadExcel(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                  @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        ExcelDto excelDto = participantService.getExcelData(startDate, endDate);

        String[] headers = {"Fecha", "Programa", "Situacion", "Retornado", "Pi", "dni/nie/pas", "Nombre", "Apellidos", "Edad",
                "Fecha nacimiento", "Genero", "Pais origen", "Municipio", "Provincia", "Telefono", "Correo",
                "Nivel de estudios", "Situacion laboral", "Numero inserciones"};

        try (Workbook workbook = WorkbookFactory.create(true)) {
            Sheet sheet = workbook.createSheet("Participantes");
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            generateTable(sheet, headers, headerCellStyle, excelDto.getParticipantExcelDtoList());

            Sheet statisticsSheet = workbook.createSheet("Estadisticas");
            int rowIndex = 0;

            // parte nacionalidades
            rowIndex = generateStatisticsHeader(rowIndex, "Nacionalidades", "Hombres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getNationalitiesCountMen(), statisticsSheet);

            rowIndex = generateStatisticsHeader(rowIndex, "Nacionalidades", "Mujeres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getNationalitiesCountWoman(), statisticsSheet);

            // parte factores exclusion
            rowIndex = generateStatisticsHeader(rowIndex, "Factores exclusion", "Hombres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getExclusionFactorCountMen(), statisticsSheet);

            rowIndex = generateStatisticsHeader(rowIndex, "Factores exclusion", "Mujeres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getExclusionFactorCountWoman(), statisticsSheet);

            // parte contratos
            rowIndex = generateStatisticsHeader(rowIndex, "Tipo contrato", "Hombres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getContractCountMen(), statisticsSheet);

            rowIndex = generateStatisticsHeader(rowIndex, "Tipo contrato", "Mujeres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getContractCountWoman(), statisticsSheet);

            rowIndex = generateStatisticsHeader(rowIndex, "Tipo jornada", "Hombres", statisticsSheet, headerCellStyle);
            rowIndex = printData(rowIndex, excelDto.getWorkTimeCountMen(), statisticsSheet);

            rowIndex = generateStatisticsHeader(rowIndex, "Tipo jornada", "Mujeres", statisticsSheet, headerCellStyle);
            printData(rowIndex, excelDto.getWorkTimeCountWoman(), statisticsSheet);

            for (int i = 0; i < 3; i++) {
                statisticsSheet.autoSizeColumn(i);
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

    private void generateTable(Sheet sheet, String[] headers, CellStyle headerCellStyle, List<ParticipantExcelDto> excelDtoList){
        // Create header row
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerCellStyle);
        }

        // Create data rows
        int rowIndex = 1;
        for (ParticipantExcelDto participantExcelDto : excelDtoList) {
            Row row = sheet.createRow(rowIndex++);

            int cellIndex = 0;

            Cell cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getPrograms());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getSituation());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getReturned());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getPi());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getDocument());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getName());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getSurnames());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getYear());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getBirthdate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getSex());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getCountry());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getMunicipality());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getProvince());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getPhone());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getEmail());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getStudies());
            cell = row.createCell(cellIndex++);
            cell.setCellValue(participantExcelDto.getWorkSituation());
            cell = row.createCell(cellIndex);
            cell.setCellValue(participantExcelDto.getNumberInsertion());
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

    }

    private int generateStatisticsHeader(int rowIndex, String dataName, String sex, Sheet sheet, CellStyle headerCellStyle){
        Row row = sheet.createRow(rowIndex++);
        Cell cell = row.createCell(0);
        cell.setCellValue(sex);
        cell.setCellStyle(headerCellStyle);
        row = sheet.createRow(rowIndex++);
        cell = row.createCell(0);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue(dataName);
        cell = row.createCell(1);
        cell.setCellStyle(headerCellStyle);
        cell.setCellValue("Número");

        return rowIndex;
    }

    private int printData(int rowIndex, Map<String, Integer> data, Sheet sheet){
        Row row;
        Cell cell;

        for( Map.Entry<String, Integer> entry : data.entrySet()) {
            row = sheet.createRow(rowIndex++);
            cell = row.createCell(0);
            cell.setCellValue(entry.getKey());
            cell = row.createCell(1);
            cell.setCellValue(entry.getValue());
        }

        return rowIndex + 2;
    }
}
