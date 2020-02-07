package com.dal.dao;

import com.dal.entity.Product;
import com.dal.entity.User;
import com.dal.entity.UserProduct;
import com.dal.entity.UserProductKey;
import com.model.data.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProductRepository extends JpaRepository<UserProduct, Long> {
    List<UserProduct> findByUser_Id(Long userID);
}
