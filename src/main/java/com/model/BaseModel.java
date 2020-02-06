package com.model;

import com.model.data.UserData;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class BaseModel implements Serializable {
    private static final long serialVersionUID = 1L;
    private UserData user;
    private String message;
    private List<?> resultList;

}
