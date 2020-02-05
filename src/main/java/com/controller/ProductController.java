package com.controller;

import com.dal.entity.Product;
import com.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        List<Product> productList = productService.findAllProducts();
        return productList;
    }

    @GetMapping("/product")
    public String getProduct() {
        return "hello";
    }
}
