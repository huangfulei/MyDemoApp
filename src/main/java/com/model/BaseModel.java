package com.model;

import com.model.data.UserData;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BaseModel implements Serializable {
    private static final long serialVersionUID = 1L;
    private UserData user;
    private String successMessage;
    private String systemFailureMessage;
    private String errorMessage;
    private List<?> resultList;

}
