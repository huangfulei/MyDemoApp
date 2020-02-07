package com.configuration;

import com.configuration.security.IAuthenticationFacade;
import com.configuration.util.DataUtil;
import com.model.BaseModel;
import com.model.data.UserData;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdvice;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

@RestControllerAdvice
public class AuthenticationRequestBodyAdvice implements RequestBodyAdvice {

    private final IAuthenticationFacade authenticationFacade;

    public AuthenticationRequestBodyAdvice(IAuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    @Override
    public boolean supports(MethodParameter methodParameter, Type type, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    @Override
    public HttpInputMessage beforeBodyRead(HttpInputMessage httpInputMessage, MethodParameter methodParameter, Type type, Class<? extends HttpMessageConverter<?>> aClass) throws IOException {
        return httpInputMessage;
    }

    @Override
    public Object afterBodyRead(Object o, HttpInputMessage httpInputMessage, MethodParameter methodParameter, Type type, Class<? extends HttpMessageConverter<?>> aClass) {
        BaseModel request = (BaseModel) o;

        Authentication authentication = authenticationFacade.getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            HashMap detail = (HashMap) ((OAuth2AuthenticationDetails) authentication.getDetails()).getDecodedDetails();
            if (DataUtil.isNull(request.getUser())) {
                request.setUser(new UserData());
            }
            if (DataUtil.isNotNull(detail)) {
                Number userID = (Number) detail.get("ID");
                request.getUser().setId(userID.longValue());
            }
        }
        return request;
    }

    @Override
    public Object handleEmptyBody(Object o, HttpInputMessage httpInputMessage, MethodParameter methodParameter, Type type, Class<? extends HttpMessageConverter<?>> aClass) {
        return o;
    }
}
