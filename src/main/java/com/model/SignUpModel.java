package com.model;

import com.model.data.SignUpData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpModel extends BaseModel {
    private SignUpData signUp;
}
