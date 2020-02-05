package com.service;

import com.dal.dao.ProductRepository;
import com.dal.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired private ProductRepository productRepository;

    public List<Product> findAllProducts(){

        return productRepository.findAll();
    }
}
