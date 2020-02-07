package com.model;

import com.model.data.ProductData;
import lombok.Data;

@Data
public class ProductModel extends BaseModel{
    private ProductData product;
}
