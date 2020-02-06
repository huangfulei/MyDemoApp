package com.controller;

import com.dal.entity.Order;
import com.dal.entity.Product;
import com.service.UserProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserProductController {

    private final UserProductService userProductService;

    public UserProductController(UserProductService userProductService) {
        this.userProductService = userProductService;
    }

    @PostMapping("/addProductToCart")
    public ResponseEntity<Order> addItemToCart(@RequestBody Product product) {

        Order order = userProductService.addProductToCart(product);

        return ResponseEntity.ok().body(order);
    }
}
