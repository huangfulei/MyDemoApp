package com.service;

import com.configuration.security.model.UserDetailsImpl;
import com.configuration.util.DataUtil;
import com.dal.dao.RoleRepository;
import com.dal.dao.UserRepository;
import com.dal.entity.Role;
import com.dal.entity.User;
import com.dal.entity.UserProduct;
import com.exceptions.ValidationException;
import com.model.AppConstants;
import com.model.LoginModel;
import com.model.SignUpModel;
import com.model.data.LoginData;
import com.model.data.SignUpData;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserService extends BaseService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws ValidationException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ValidationException("User not found: " + username));
        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), new HashSet<>());
    }

    public void loginUser(LoginModel loginModel) {
        User user = userRepository.findByEmail(loginModel.getLogin().getEmail())
                .orElseThrow(() -> new ValidationException("User not found!"));
        map(user, loginModel.getLogin());
        int totalNumberOfProducts = user.getUserProducts().stream().mapToInt(UserProduct::getQuantity).sum();
        loginModel.getLogin().setTotalNumberOfProducts(totalNumberOfProducts);
        loginModel.setSuccessMessage("Enjoy your day!");
    }

    public void signUpUser(SignUpModel signUpModel) {
        SignUpData signUpData = signUpModel.getSignUp();
        if (userRepository.existsByUsername(signUpData.getUsername())) {
            throw new ValidationException("User Name already taken!");
        }

        if (userRepository.existsByEmail(signUpData.getEmail())) {
            throw new ValidationException("Email is in use!");
        }

        // Create new user's account
        if (DataUtil.isNull(signUpData.getRequestRole())) {
            Role userRole = roleRepository.findByName(AppConstants.CUSTOMER);
            signUpData.getRoles().add(userRole);
        } else if (AppConstants.ADMIN.equals(signUpData.getRequestRole())) {
            Role adminRole = roleRepository.findByName(AppConstants.ADMIN);
            signUpData.getRoles().add(adminRole);
        }

        User newUser = map(signUpData, User.class);
        userRepository.save(newUser);
        signUpModel.setSuccessMessage("Sign up successful!");
    }
}
