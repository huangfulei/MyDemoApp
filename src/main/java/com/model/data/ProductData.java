package com.model.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductData {
    private Integer id;
    private String name;
    private String description;
    private Integer price;
    private Integer stock;
}
