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
    private BalanceRepository balanceRepository;

    @GetMapping
    public Balance getBalance() {
        List<Balance> balances = balanceRepository.findAll();
        Balance balance = balances.get(0);
        return balance;
    }

    public void updateBalance(Double newBalanceValue) {
        Balance currentBalance = getBalance();
        currentBalance.setBalance(newBalanceValue);
    }
}
