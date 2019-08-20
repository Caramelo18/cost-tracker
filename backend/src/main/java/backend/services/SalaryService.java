package backend.services;

import backend.models.Salary;
import backend.repositories.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class SalaryService {
    @Autowired
    private SalaryRepository salaryRepository;

    public Salary addSalary(Salary salary) {
        Salary currentSalary = this.getCurrentSalary();
        if(this.getCurrentSalary() != null) {
            Date currentDate = Date.from(ZonedDateTime.now(ZoneOffset.UTC).toInstant());
            currentSalary.setEndDate(currentDate);
            salaryRepository.save(currentSalary);
        }
        return salaryRepository.save(salary);
    }

    public List<Salary> getAll() {
        return salaryRepository.findAll();
    }

    public Salary getCurrentSalary() {
        List<Salary> salaries = salaryRepository.findAll();
        Salary currentSalary = null;

        for(Salary salary: salaries) {
            if (salary.getEndDate() == null) {
                currentSalary = salary;
            }
        }
        return currentSalary;
    }
}
