package com.service;

import com.dal.dao.ProductRepository;
import com.model.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends BaseService {

    @Autowired
    private ProductRepository productRepository;

    public void findAllProducts(ProductModel productModel) {
        setResultList(productRepository.findAll(), productModel);
    }
}
