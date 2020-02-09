package com.model.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpData extends UserData {
    private String password;
    private String requestRole;
}
