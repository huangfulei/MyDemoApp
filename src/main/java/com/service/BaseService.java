package com.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseService {

    @Autowired
    private ModelMapper modelMapper;

    protected <T> T map(Object object, Class<T> tClass) {
        return this.modelMapper.map(object, tClass);
    }
}
