package com.dal.dao;

import com.dal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Page<User> findByEmailContains(String email, Pageable pageable);

    Page<User> findAllByEmail(String email, Pageable pageable);

    Page<User> findAllByEmailContainsAndEmail(String email, String auth, Pageable pageable);


}
