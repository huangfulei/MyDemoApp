package com.dal.dao;

import com.dal.entity.UserProduct;
import com.dal.entity.UserProductKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProductRepository extends JpaRepository<UserProduct, Long> {
}
