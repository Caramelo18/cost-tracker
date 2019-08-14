package backend;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Balance {
    private Double balance;

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

}
