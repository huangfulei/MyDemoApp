package com.controller;

import com.configuration.util.AdminHelper;
import com.dal.dao.RoleRepository;
import com.dal.dao.UserRepository;
import com.dal.entity.User;
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

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final AdminHelper adminHelper;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

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
    UserModel signin(@RequestBody User requestUser) {

        User user = userRepository.findByEmail(requestUser.getEmail()).get();
        UserModel userModel = modelMapper.map(user, UserModel.class);
        System.out.println("user has logged in");
        return userModel;
    }

/*    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {

        adminHelper.permissionManage();

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User newUser = new User(user.getUsername(),
                user.getEmail(),
                passwordEncoder.encode(user.getPassword()));

        Collection<Role> strRoles = user.getRoles();
        Collection<Role> roles = new HashSet<>();


        if (strRoles == null) {
            Role userRole = roleRepository.findByName(AppConstants.CUSTOMER);
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(AppConstants.ADMIN);
                    Role newRole = adminRole;
                    roles.add(newRole);
                }
            });
        }

        newUser.setRoles(roles);
        userRepository.save(newUser);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }*/

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
