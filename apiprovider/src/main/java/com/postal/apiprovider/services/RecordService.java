package com.postal.apiprovider.services;

import com.postal.dataprovider.models.Record;
import com.postal.dataprovider.repositories.RecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class RecordService {

    private final RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public List<Record> getAll() {
        List<Record> recordList = new ArrayList<>();
        this.recordRepository.findAll().forEach(recordList::add);
        return recordList;
    }

    public Record get(String id) {
        return this.recordRepository
                .findById(id)
                .orElseThrow(NoSuchElementException::new);
    }

    public Record save(Record record) {
        return this.recordRepository.save(record);
    }

    public void delete(String id) {
        this.recordRepository.deleteById(id);
    }
}
