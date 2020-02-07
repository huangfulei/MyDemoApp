package com.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BaseService {

    @Autowired
    private ModelMapper modelMapper;

    protected <D, T> D map(T source, Class<D> targetType) {
        return this.modelMapper.map(source, targetType);
    }

    protected <D, T> List<D> mapAll(final Collection<T> sourceList, Class<D> targetType) {
        return sourceList.stream()
                .map(source -> map(source, targetType))
                .collect(Collectors.toList());
    }
}
