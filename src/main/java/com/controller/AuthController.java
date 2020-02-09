package com.controller;

import com.model.BaseModel;
import com.model.SignUpModel;
import com.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @GetMapping("/home")
    public RedirectView showHomePage() {
        return new RedirectView("/");
    }

    @PostMapping("/login")
    public BaseModel signIn(@RequestBody BaseModel userModel) {
        userService.loginUser(userModel);
        return userModel;
    }

    @PostMapping("/signup")
    public SignUpModel signUp(@RequestBody SignUpModel signUpModel) {
        // adminHelper.permissionManage();
        userService.signUpUser(signUpModel);
        return signUpModel;
    }

    //todo: may need to use this to check user credential
    private Authentication authenticate(String username, String password) throws Exception {
        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
