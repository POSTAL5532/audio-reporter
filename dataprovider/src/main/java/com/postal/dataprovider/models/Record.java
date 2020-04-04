package com.postal.dataprovider.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "records")
public class Record extends AbstractEntity {

    @Column(name = "from_page")
    private String fromPage;

    private float size;

    private Timestamp date;

    public Record() {
        super();
    }

    public String getFromPage() {
        return fromPage;
    }

    public void setFromPage(String fromPage) {
        this.fromPage = fromPage;
    }

    public float getSize() {
        return size;
    }

    public void setSize(float size) {
        this.size = size;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Record{" +
                "fromPage='" + fromPage + '\'' +
                ", size=" + size +
                ", date=" + date +
                ", id='" + id + '\'' +
                '}';
    }
}
