package com.model.data;

import com.dal.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class UserData extends BaseData {
    private String email;
    private String username;
    private Set<Role> roles = new HashSet<>();
}
