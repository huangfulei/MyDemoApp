package com.model;

import com.model.data.ProductData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductModel extends BaseModel {
    private ProductData product;
}
