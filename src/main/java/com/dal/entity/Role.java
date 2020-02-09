package com.dal.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;

/**
 * @author Fulei
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Role {

    public Role(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 20)
    private String name;

/*    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;*/


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "roles_privileges",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "privilege_id", referencedColumnName = "id"))
    private Collection<Privilege> privileges = new HashSet<>();

}
