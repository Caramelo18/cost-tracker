package backend.controllers;

import backend.models.Salary;
import backend.services.SalaryService;
import backend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@Controller
@RequestMapping("/salaries")
public class SalaryController {
    @Autowired
    private SalaryService salaryService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Salary add(@RequestBody Salary salary) {
        return salaryService.addSalary(salary);
    }

    @GetMapping
    public List<Salary> getAll() {
        return salaryService.getAll();
    }

    @PutMapping(value = "/{id}")
    public Salary update (@PathVariable String id, @RequestBody Salary updatedSalary) {
        Salary salary = null;
        try {
            salary = salaryService.editSalary(id, updatedSalary);
        } catch (TransactionService.NotFoundException e) {
            throw new NotFoundException();
        }
        return salary;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete (@PathVariable String id) {
        try {
            salaryService.deleteSalary(id);
        } catch (TransactionService.NotFoundException e ){
            throw new NotFoundException();
        }
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException {
        public NotFoundException() {
        }
    }

}
