package es.udc.paproject.backend.rest.controllers;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.services.ParticipantService;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
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

    @GetMapping("/downloadExcel")
    public ResponseEntity<Resource> downloadExcel() {
        String[] headers = {"fecha", "programa", "situacion", "retornado", "pi", "dni/nie/pas", "nombre", "apellido1", "apellido2", "edad",
                "fecha nacimiento", "genero", "pais origen", "nacionalidad", "municipio", "provincia", "telefono", "correo",
                "nivel de estudios", "situacion laboral", "numero inserciones"};

        List<List<Object>> data = new ArrayList<>();

        // Example data, replace this with your actual data
        for (int i = 0; i < 10; i++) {
            List<Object> rowData = new ArrayList<>();
            rowData.add("2023-08-05");
            rowData.add("Programa " + (i + 1));
            rowData.add("Situación " + (i + 1));
            rowData.add(true);
            rowData.add("PI " + (i + 1));
            rowData.add("DNI/NIE/PAS " + (i + 1));
            rowData.add("Nombre " + (i + 1));
            rowData.add("Apellido1 " + (i + 1));
            rowData.add("Apellido2 " + (i + 1));
            rowData.add(30 + i);
            rowData.add("1993-01-01");
            rowData.add("Género " + (i + 1));
            rowData.add("País " + (i + 1));
            rowData.add("Nacionalidad " + (i + 1));
            rowData.add("Municipio " + (i + 1));
            rowData.add("Provincia " + (i + 1));
            rowData.add("123456789");
            rowData.add("correo" + (i + 1) + "@example.com");
            rowData.add("Nivel de estudios " + (i + 1));
            rowData.add("Situación laboral " + (i + 1));
            rowData.add(i + 1);

            data.add(rowData);
        }

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
            for (List<Object> rowData : data) {
                Row row = sheet.createRow(rowIndex++);
                int cellIndex = 0;
                for (Object value : rowData) {
                    Cell cell = row.createCell(cellIndex++);
                    if (value instanceof String) {
                        cell.setCellValue((String) value);
                    } else if (value instanceof Boolean) {
                        cell.setCellValue((Boolean) value);
                    } else if (value instanceof Integer) {
                        cell.setCellValue((Integer) value);
                    }
                    // You can add more conditions to handle other data types if needed
                }
            }
         
            // Write the Excel data to a byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            byte[] excelBytes = outputStream.toByteArray();
            
            
            String filePath = "data.xlsx";
            try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
                workbook.write(fileOut);
            }

            // Create a ByteArrayResource from the byte array
            Resource excelResource = new ByteArrayResource(excelBytes);

            HttpHeaders head = new HttpHeaders();
            head.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            head.setContentDispositionFormData("attachment", "data.xlsx");

            return new ResponseEntity<>(excelResource, head, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
