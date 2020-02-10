package com.service;

import com.configuration.util.DataUtil;
import com.exceptions.ValidationException;
import com.model.BaseModel;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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

    protected void setLoosMap(){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
    }

    protected void setStandardMap(){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
    }

    protected void setStrictMap(){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    public void setResultList(List<?> resultList, BaseModel baseModel) {
        this.setResultList(resultList, baseModel, "No data found");
    }

    private void setResultList(List<?> resultList, BaseModel baseModel, String errorMessage) {
        if(DataUtil.listHasData(resultList)){
            baseModel.setResultList(resultList);
        }else {
            this.addErrorMessage(errorMessage, baseModel);
        }
    }

    private void addErrorMessage(String errorMessage, BaseModel baseModel) {
        this.addErrorMessage(errorMessage, baseModel, false);
    }

    private void addErrorMessage(String errorMessage, BaseModel baseModel, boolean throwException) {
        if(DataUtil.isNotNull(baseModel)){
            baseModel.setErrorMessage(errorMessage);
        }
        if(throwException){
            // todo create a system error handler
            throw new ValidationException(errorMessage);
        }
    }

}
