package backend.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Subscription {
    @Id
    private String id;
    private String category;
    private String description;
    private String periodicity;
    private Integer daysInterval;
    @CreatedDate
    private Date startDate;
    private Double value;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPeriodicity(String periodicity) {
        this.periodicity = periodicity;
    }

    public String getPeriodicity() {
        return this.periodicity;
    }

    public Integer getDaysInterval() {
        return daysInterval;
    }

    public void setDaysInterval(Integer daysInterval) {
        this.daysInterval = daysInterval;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setDate(Date startDate) {
        this.startDate = startDate;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
