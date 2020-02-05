package com.model;

import com.model.data.UserData;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class UserModel extends BaseModel{
    private UserData user;
}
