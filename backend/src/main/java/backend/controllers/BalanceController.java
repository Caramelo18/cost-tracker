package backend.controllers;

import backend.models.Balance;
import backend.services.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@Controller
@RequestMapping("/balance")
public class BalanceController {
    @Autowired
    private BalanceService balanceService;

    @GetMapping
    public Balance getBalance() {
        return balanceService.getCurrentBalance();
    }

}
