package com.configuration.util;

import com.dal.dao.PrivilegeRepository;
import com.dal.dao.RoleRepository;
import com.model.AppConstants;
import com.dal.entity.Privilege;
import com.dal.entity.Role;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class AdminHelper {

    private final RoleRepository roleRepository;

    private final PrivilegeRepository privilegeRepository;

    public AdminHelper(RoleRepository roleRepository, PrivilegeRepository privilegeRepository) {
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
    }

    public void permissionManage() {

        //create privilege
        Privilege readPrivilege = createPrivilegeIfNotFound("READ");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE");

        //assign privilege to different roles
        List<Privilege> adminPrivileges = Arrays.asList(readPrivilege, writePrivilege);
        createRoleIfNotFound(AppConstants.ADMIN, adminPrivileges);
        createRoleIfNotFound(AppConstants.CUSTOMER, Arrays.asList(readPrivilege));
    }

    private Privilege createPrivilegeIfNotFound(String name) {

        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    private Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {

        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }
}
