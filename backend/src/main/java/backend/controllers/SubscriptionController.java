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
}
