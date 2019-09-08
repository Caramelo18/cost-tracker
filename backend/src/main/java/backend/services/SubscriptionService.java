package backend.services;

import backend.models.Subscription;
import backend.models.Transaction;
import backend.repositories.SubscriptionRepository;
import backend.repositories.TransactionRepository;
import backend.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private TransactionService transactionService;

    public Subscription addSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getSubscriptions() {
        return subscriptionRepository.findAll();
    }

    @Transactional
    public void paySubscription(Subscription subscription) {
        Transaction transaction = new Transaction();
        transaction.setCategory(subscription.getCategory());
        transaction.setDescription(subscription.getDescription());
        transaction.setValue(subscription.getValue());
        transaction.setSubsciptionId(subscription.getId());

        transactionService.addTransaction(transaction);

        Date paidUntil = subscription.getPaidUntil();
        int daysInterval = subscription.getDaysInterval();

        if (paidUntil == null) {
            Date currentDate = new Date(System.currentTimeMillis());
            LocalDateTime localDateTime = DateUtils.asLocalDateTime(currentDate);
            localDateTime = localDateTime.plusDays(daysInterval);
            paidUntil = DateUtils.asDate(localDateTime);
        } else {
            LocalDateTime localDateTime = DateUtils.asLocalDateTime(paidUntil);
            localDateTime = localDateTime.plusDays(daysInterval);
            paidUntil = DateUtils.asDate(localDateTime);
        }

        subscription.setPaidUntil(paidUntil);

        subscriptionRepository.save(subscription);
    }

}
