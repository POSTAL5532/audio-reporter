package com.postal.apiprovider.controllers.record;

import com.postal.apiprovider.services.RecordService;
import com.postal.dataprovider.models.Record;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    public static final String FILES_PATH = "C:\\Users\\User\\Documents\\serverStorage\\records";

    private RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping
    public List<Record> getAll() {
        return this.recordService.getAll();
    }

    @GetMapping("{id}")
    public Record get(@PathVariable("id") String id) {
        return this.recordService.get(id);
    }

    //C:\Users\User\Documents\serverStorage\records
    @PostMapping
    public Record create(@RequestParam(value = "record") MultipartFile record, @RequestParam(value = "currentUrl") String currentUrl) {
        Record newRecord = new Record();

        newRecord.setDate(Timestamp.valueOf(LocalDateTime.now()));
        newRecord.setFromPage(currentUrl);
        newRecord.setSize(record.getSize() / 1024);

        newRecord = this.recordService.save(newRecord);
        saveRecord(record, newRecord.getId() + ".mp3");

        return newRecord;
    }

    private void saveRecord(MultipartFile record, String fileName) {
        try {
            File recordFile = new File(String.format("%s\\%s", FILES_PATH, fileName));
            FileUtils.writeByteArrayToFile(recordFile, record.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
