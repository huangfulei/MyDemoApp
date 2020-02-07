package com.service;

import com.configuration.util.DataUtil;
import com.dal.dao.UserProductRepository;
import com.dal.entity.UserProduct;
import com.model.ProductModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserProductService extends BaseService {

    private final UserProductRepository userProductRepository;

    public UserProductService(UserProductRepository userProductRepository) {
        this.userProductRepository = userProductRepository;
    }

    public void addProductToCart(ProductModel product) {

        ArrayList<UserProduct> userProducts = (ArrayList<UserProduct>) userProductRepository.findByUser_Id(product.getUser().getId());

        UserProduct newUserProduct = userProducts.stream().filter(userProduct -> userProduct.getProduct().getId().equals(product.getProduct().getId()))
                .findAny()
                .orElse(null);

        if (DataUtil.isNull(newUserProduct)) {
            newUserProduct = map(product, UserProduct.class);
        }
        newUserProduct.setQuantity(newUserProduct.getQuantity() + 1);

        userProductRepository.save(newUserProduct);

        //todo: add messages to the model

    }
/*
    private boolean productExist(LoggedUser user, Product product) {
        for (UserProduct existingProduct : user.getUserProducts()) {
            return existingProduct.getId().getProductId().equals(product.getId());
        }
        return false;
    }*/
}
