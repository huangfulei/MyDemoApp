package com.controller;

import com.configuration.util.AdminHelper;
import com.dal.dao.RoleRepository;
import com.dal.dao.UserRepository;
import com.dal.entity.Role;
import com.dal.entity.User;
import com.exceptions.ValidationException;
import com.model.AppConstants;
import com.model.UserModel;
import com.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Set;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final AdminHelper adminHelper;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    // todo: move the logic to userService class
    public AuthController(AuthenticationManager authenticationManager, AdminHelper adminHelper, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserService userService, ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.adminHelper = adminHelper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/home")
    public RedirectView showHomePage() {
        return new RedirectView("/");
    }


    @PostMapping("/login")
    UserModel signin(@RequestBody UserModel userModel) throws Exception {

        // todo: throw right exception
        User user = userRepository.findByEmail(userModel.getUser().getEmail())
                .orElseThrow(() -> new ValidationException("User not found"));

        UserModel responseModel = modelMapper.map(user, UserModel.class);
        System.out.println("user has logged in");
        return responseModel;
    }

    @PostMapping("/signup")
    public UserModel registerUser(@RequestBody UserModel userModel) {

        // adminHelper.permissionManage();

        if (userRepository.existsByUsername(userModel.getUser().getUsername())) {
            return null;
        }

        if (userRepository.existsByEmail(userModel.getUser().getEmail())) {
            return null;
        }

        // Create new user's account
        User newUser = new User(userModel.getUser().getUsername(),
                userModel.getUser().getEmail(),
                passwordEncoder.encode(userModel.getUser().getPassword()));

        Set<Role> roles = userModel.getUser().getRoles();

        if (roles.isEmpty()) {
            Role userRole = roleRepository.findByName(AppConstants.CUSTOMER);
            roles.add(userRole);
        } else {
            roles.forEach(role -> {
                if (AppConstants.ADMIN.equals(role.getName())) {
                    Role adminRole = roleRepository.findByName(AppConstants.ADMIN);
                    roles.add(adminRole);
                }
            });
        }

        newUser.setRoles(roles);
        userRepository.save(newUser);

        return userModel;
    }

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
