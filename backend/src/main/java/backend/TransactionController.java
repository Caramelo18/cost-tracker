package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping
    @ResponseStatus(code =  HttpStatus.CREATED)
    public Transaction add(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @GetMapping
    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    @GetMapping(value = "/{id}")
    public Transaction getOne(@PathVariable String id) {
        return transactionRepository.findById(id).orElseThrow(() -> new NotFoundException());
    }

    @PutMapping(value = "/{id}")
    public Transaction update(@PathVariable String id, @RequestBody Transaction newTransaction) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException());
        transaction.setCategory(newTransaction.getCategory());
        transaction.setDate(newTransaction.getDate());
        transaction.setValue(newTransaction.getValue());
        transaction.setDescription(newTransaction.getDescription());
        return transactionRepository.save(transaction);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete (@PathVariable String id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow(() -> new NotFoundException());
        transactionRepository.delete(transaction);
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException {
        public NotFoundException() {
        }
    }
}
