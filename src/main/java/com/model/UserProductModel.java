package com.model;

import com.model.data.UserProductData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserProductModel extends BaseModel {
    private UserProductData userProduct;
}
