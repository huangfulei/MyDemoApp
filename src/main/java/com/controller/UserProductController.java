package com.controller;

import com.model.BaseModel;
import com.model.ProductModel;
import com.service.UserProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cart/")
public class UserProductController {

    private final UserProductService userProductService;

    public UserProductController(UserProductService userProductService) {
        this.userProductService = userProductService;
    }

    @PostMapping("/addProductToCart")
    public ProductModel addItemToCart(@RequestBody ProductModel product) {

        userProductService.addProductToCart(product);

        return null;
    }

    @PostMapping("search")
    public ProductModel searchCart(@RequestBody ProductModel productModel) {
        userProductService.search(productModel);
        return productModel;
    }
}
