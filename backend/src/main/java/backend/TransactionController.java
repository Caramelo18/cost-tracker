package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    @ResponseStatus(code =  HttpStatus.CREATED)
    public Transaction add(@RequestBody Transaction transaction) {
        Transaction createdTransaction = null;
        try{
            createdTransaction = transactionService.addTransaction(transaction);
        } catch (Exception e){
            createdTransaction = new Transaction();
            transaction.setValue(0.0);
            transaction.setDescription("Invalid");
            transaction.setCategory("Invalid");
        }
        return createdTransaction;
    }

    @GetMapping
    public List<Transaction> getAll() {
        return transactionService.getAll();
    }

    @GetMapping(value = "/{id}")
    public Transaction getOne(@PathVariable String id) {
        Transaction transaction = transactionService.getTransaction(id).orElseThrow(() -> new NotFoundException());
        return transaction;
    }

    @PutMapping(value = "/{id}")
    public Transaction update(@PathVariable String id, @RequestBody Transaction newTransaction) {
        Transaction transaction = null;
        try {
            transaction = transactionService.updateTransaction(id, newTransaction);
        } catch (TransactionService.NotFoundException e) {
            throw new NotFoundException();
        }
        return transaction;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete (@PathVariable String id) {
        try {
            transactionService.deleteTransaction(id);
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
