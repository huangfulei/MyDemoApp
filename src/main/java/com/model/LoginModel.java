package com.model;

import com.model.data.LoginData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter@Setter@NoArgsConstructor
public class LoginModel extends BaseModel{
    private LoginData login;
}
