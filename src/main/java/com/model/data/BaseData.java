package com.model.data;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class BaseData implements Serializable {
    public static final long serialVersionUID = 1L;

    private Long id;
    private String name;

}
