package com.dal.dao;

import com.dal.entity.UserProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProductRepository extends JpaRepository<UserProduct, Long> {
    List<UserProduct> findByUser_Id(Long userID);
}
