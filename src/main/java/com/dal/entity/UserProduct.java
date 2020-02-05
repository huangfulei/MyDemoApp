package com.dal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProduct {

    @EmbeddedId
    private UserProductKey id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("product_id")
    private Product product;

    int quantity;

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
