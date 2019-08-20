package backend.controllers;

import backend.models.Salary;
import backend.services.SalaryService;
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
}
