package backend.controllers;

import backend.models.Subscription;
import backend.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@Controller
@RequestMapping("/subscriptions")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Subscription add(@RequestBody Subscription subscription) {
        return subscriptionService.addSubscription(subscription);
    }

    @GetMapping
    public List<Subscription> getSubscriptions() {
        return subscriptionService.getSubscriptions();
    }

    @RequestMapping(value = "/pay", method = RequestMethod.POST)
    public void paySubscription(@RequestBody Subscription subscription) {
        subscriptionService.paySubscription(subscription);
    }

    @PutMapping(value = "/{id}")
    public Subscription update(@PathVariable String id, @RequestBody Subscription updatedSubscription) {
        Subscription subscription = null;
        try {
            subscription = subscriptionService.updateSubscription(id, updatedSubscription);
        } catch (SubscriptionService.NotFoundException e) {
            throw new NotFoundException();
        }
        return subscription;
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete (@PathVariable String id) {
        try {
            subscriptionService.deleteSubscription(id);
        } catch (SubscriptionService.NotFoundException e){
            throw new NotFoundException();
        }
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException {
        public NotFoundException() {
        }
    }
}
