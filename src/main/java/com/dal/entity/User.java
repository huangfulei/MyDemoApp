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
@Data
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@NoArgsConstructor
public class User {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Size(max = 20)
    private String username;

    @Getter
    @Setter
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @Getter
    @Setter
    @NotBlank
    @Size(max = 120)
    @JsonIgnore
    @ToString.Exclude
    private String password;

/*    @Getter
    @Setter
    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;*/

//    private Set<Role> role = new HashSet<>();

/*    @Getter
    @Setter
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<UserProduct> userProducts;*/

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
