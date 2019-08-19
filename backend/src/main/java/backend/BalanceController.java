package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/balance")
public class BalanceController {
    @Autowired
    private BalanceService balanceService;

    @GetMapping
    public Balance getBalance() {
        return balanceService.getCurrentBalance();
    }

}
