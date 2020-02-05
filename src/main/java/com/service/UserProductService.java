package com.service;

import com.dal.dao.UserProductRepository;
import com.dal.dao.UserRepository;
import com.dal.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserProductService {

    private final UserProductRepository userProductRepository;
    private final UserRepository userRepository;

    public UserProductService(UserProductRepository userProductRepository, UserRepository userRepository) {
        this.userProductRepository = userProductRepository;
        this.userRepository = userRepository;
    }

    public Order addProductToCart(Product product) {

        int productId = product.getId();
        UserProductKey key = new UserProductKey();
        key.setProductId(productId);

        if (userProductRepository.existsById(key)) {

            UserProduct userProduct = userProductRepository.findById(key).get();
            userProduct.setQuantity(userProduct.getQuantity() + 1);
            userProductRepository.save(userProduct);
//            return userProduct;

        } else {
            UserProduct userProduct = new UserProduct();
            userProduct.setId(key);
            userProduct.setQuantity(1);
            userProductRepository.save(userProduct);
//            return userProduct;
        }
        return null;
    }
/*
    private boolean productExist(LoggedUser user, Product product) {
        for (UserProduct existingProduct : user.getUserProducts()) {
            return existingProduct.getId().getProductId().equals(product.getId());
        }
        return false;
    }*/
}
