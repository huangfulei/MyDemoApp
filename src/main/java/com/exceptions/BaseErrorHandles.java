package com.exceptions;

import com.model.BaseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Slf4j
public class BaseErrorHandles {

    @ResponseBody
    @ExceptionHandler(value = {ValidationException.class})
    public BaseModel handleException(ValidationException exception) {
        BaseModel baseModel = new BaseModel();
        baseModel.setErrorMessage(exception.getMsg());
        return baseModel;
    }
}
