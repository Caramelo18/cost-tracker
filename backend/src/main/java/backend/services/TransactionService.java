package backend.services;

import backend.models.Balance;
import backend.models.Transaction;
import backend.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BalanceService balanceService;

    @Transactional
    public Transaction addTransaction(Transaction transaction) {
        Transaction createdTransaction = transactionRepository.save(transaction);

        Balance currentBalance = balanceService.getCurrentBalance();

        currentBalance.setBalance(currentBalance.getBalance() + transaction.getValue());

        balanceService.updateBalance(currentBalance);

        return createdTransaction;
    }

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransaction(String id) {
        return transactionRepository.findById(id);
    }

    @Transactional
    public Transaction updateTransaction(String id, Transaction updatedTransaction) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException());
        Double previousValue = transaction.getValue();
        transaction.setCategory(updatedTransaction.getCategory());
        transaction.setDate(updatedTransaction.getDate());
        transaction.setValue(updatedTransaction.getValue());
        transaction.setDescription(updatedTransaction.getDescription());

        Balance balance = balanceService.getCurrentBalance();
        Double newBalance = balance.getBalance() - previousValue + updatedTransaction.getValue();
        balance.setBalance(newBalance);
        balanceService.updateBalance(balance);

        return transactionRepository.save(transaction);
    }

    @Transactional
    public void deleteTransaction(String id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException());

        Balance balance = balanceService.getCurrentBalance();
        Double newBalance = balance.getBalance() - transaction.getValue();
        balance.setBalance(newBalance);

        transactionRepository.delete(transaction);
        balanceService.updateBalance(balance);
    }

    public class NotFoundException extends RuntimeException {
        public NotFoundException() {
        }
    }

}
