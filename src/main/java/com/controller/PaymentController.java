package com.controller;

import com.dal.entity.PaymentIntentClientSecret;
import com.service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Coupon;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;

@RestController
public class PaymentController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    private StripeService stripeService;

    public PaymentController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @GetMapping(value = "/intent", produces = MediaType.APPLICATION_JSON_VALUE)
    public PaymentIntentClientSecret getIntent() {
        Stripe.apiKey = "sk_test_TrT5PyNiM9HBvhPUVabMNiOq00oJbGBl2p";

        // todo: get product by product id and get location from user(for now only use euro)
        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setCurrency("eur").setAmount(1099L)
                .build();
        try {
            PaymentIntent intent = PaymentIntent.create(createParams);
            PaymentIntentClientSecret clientSecret = new PaymentIntentClientSecret(intent.getClientSecret());
            return clientSecret;
        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }
    }

/*    @PostMapping(value = "/saveCard")
    public void saveCard(){
        // This creates a new Customer and attaches the PaymentMethod in one API call.
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("payment_method", intent.getPaymentMethod());
        Customer.create(customerParams);
    }*/

    @GetMapping("/subscription")
    public String subscriptionPage(Model model) {
        model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
        return "subscription";
    }

    @GetMapping("/charge")
    public String chargePage(Model model) {
        model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
        return "charge";
    }

    /*========== REST APIs for Handling Payments ===================*/

    @PostMapping("/create-subscription")
    public @ResponseBody
    ResponseEntity<?> createSubscription(String email, String token, String plan, String coupon) {
        //validate data
        if (token == null || plan.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("Stripe payment token is missing. Please, try again later.");
        }

        //create customer first
        String customerId = stripeService.createCustomer(email, token);

        if (customerId == null) {
            return ResponseEntity
                    .badRequest()
                    .body("An error occurred while trying to create a customer.");
        }

        //create subscription
        String subscriptionId = stripeService.createSubscription(customerId, plan, coupon);
        if (subscriptionId == null) {
            return ResponseEntity
                    .badRequest()
                    .body("An error occurred while trying to create a subscription.");
        }

        // Ideally you should store customerId and subscriptionId along with customer object here.
        // These values are required to update or cancel the subscription at later stage.

        return ResponseEntity
                .ok()
                .body("Success! Your subscription id is " + subscriptionId);
    }

    @PostMapping("/cancel-subscription")
    public @ResponseBody
    ResponseEntity<?> cancelSubscription(String subscriptionId) {
        boolean status = stripeService.cancelSubscription(subscriptionId);
        if (!status) {
            return ResponseEntity
                    .badRequest()
                    .body("Failed to cancel the subscription. Please, try later.");
        }
        return ResponseEntity
                .ok()
                .body("Subscription cancelled successfully.");
    }

    @PostMapping("/coupon-validator")
    public @ResponseBody
    ResponseEntity<?> couponValidator(String code) {
        Coupon coupon = stripeService.retrieveCoupon(code);
        if (coupon != null && coupon.getValid()) {
            String details = (coupon.getPercentOff() == null ? "$" + (coupon.getAmountOff() / 100) : coupon.getPercentOff() + "%") +
                    " OFF " + coupon.getDuration();
            return ResponseEntity
                    .ok()
                    .body(details);
        } else {
            return ResponseEntity
                    .badRequest()
                    .body("This coupon code is not available. This may be because it has expired or has " +
                            "already been applied to your account.");
        }
    }

    @PostMapping("/create-charge")
    public @ResponseBody
    ResponseEntity<?> createCharge(String email, HttpServletRequest request) {
        //validate data
        String token = request.getHeader("token");
        Integer amount = Integer.valueOf(request.getHeader("amount"));
        if (token == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Stripe payment token is missing. Please, try again later.");
        }

        //create charge
        String chargeId = stripeService.createCharge(email, token, amount); //$9.99 USD
        if (chargeId == null) {
            return ResponseEntity
                    .badRequest()
                    .body("An error occurred while trying to create a charge.");
        }

        // You may want to store charge id along with order information

        return ResponseEntity
                .ok()
                .body("Success! Your charge id is " + chargeId);
    }
}
