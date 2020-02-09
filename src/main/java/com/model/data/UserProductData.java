package com.model.data;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProductData {
    private Long id;
    private ProductData product;
    private int quantity;
    private Number totalPrice;
}
