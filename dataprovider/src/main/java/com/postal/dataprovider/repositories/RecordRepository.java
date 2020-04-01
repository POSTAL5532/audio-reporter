package com.postal.dataprovider.repositories;

import com.postal.dataprovider.models.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends CrudRepository<Record, String> {
}
