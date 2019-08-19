package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {
    @Autowired
    private BalanceRepository balanceRepository;

    public Balance getCurrentBalance() {
        List<Balance> balances = balanceRepository.findAll();
        Balance currentBalance = balances.get(0);

        return currentBalance;
    }

    public void updateBalance(Balance balance) {
        balanceRepository.save(balance);
    }
}
