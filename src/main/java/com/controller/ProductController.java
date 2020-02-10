package com.controller;

import com.model.ProductModel;
import com.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    public ProductModel getProducts(@RequestBody ProductModel productModel) {
        productService.findAllProducts(productModel);
        return productModel;
    }

    @GetMapping("/product")
    public String getProduct() {
        return "hello";
    }
}
