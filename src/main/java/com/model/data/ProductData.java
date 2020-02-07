package com.model.data;

import lombok.Data;

@Data
public class ProductData {

    private Integer id;

    private String name;

    private String description;

    private Integer price;

    private Integer stock;
}
