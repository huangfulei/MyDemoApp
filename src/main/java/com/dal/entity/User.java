package com.dal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Fulei
 */
@Entity
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

//    private Set<Role> role = new HashSet<>();

//    @LazyCollection(LazyCollectionOption.FALSE)

    @OneToMany(mappedBy = "user")
    private Set<UserProduct> userProducts;

    private Date createdAt;

    @PrePersist
    void createdAt() {
        this.createdAt = new Date();
    }

/*    @Transient
    public Integer getTotalOrderPrice() {
        int sum = 0;
        Set<UserProduct> userProducts = this.userProducts;
        for (UserProduct userProduct : userProducts) {
            sum += userProduct.getTotalPrice();
        }
        return sum;
    }

    @Transient
    public int getNumberOfProducts() {
        int sum = 0;
        Set<UserProduct> userProducts = this.userProducts;
        for (UserProduct userProduct : userProducts) {
            sum += userProduct.getQuantity();
        }
        return sum;
    }*/

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
