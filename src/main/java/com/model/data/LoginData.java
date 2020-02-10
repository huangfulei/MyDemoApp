package com.model.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginData extends UserData{
    private int totalNumberOfProducts;
}
