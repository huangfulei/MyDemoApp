package com.model;

import com.model.data.UserData;

import java.io.Serializable;
import java.util.List;

public class BaseModel implements Serializable {
    private static final long serialVersionUID = 1L;
    private UserData user;
    private List<?> resultList;


}
