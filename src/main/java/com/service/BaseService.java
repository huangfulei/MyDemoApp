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

    protected <S, T> T map(S source, Class<T> targetType) {
        return this.modelMapper.map(source, targetType);
    }

    protected <S, T> List<T> mapAll(final Collection<S> sourceList, Class<T> targetType) {
        return sourceList.stream()
                .map(source -> map(source, targetType))
                .collect(Collectors.toList());
    }
    protected <S, T> T map(final S source, T target) {
        modelMapper.map(source, target);
        return target;
    }
}
