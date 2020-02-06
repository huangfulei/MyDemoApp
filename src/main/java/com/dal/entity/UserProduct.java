package com.dal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Product product;

    private int quantity;

    @Transient
    public Product getProduct() {
        return this.product;
    }

    @Transient
    @JsonIgnore
    public Integer getTotalPrice() {
        return getProduct().getPrice() * this.quantity;
    }
}
