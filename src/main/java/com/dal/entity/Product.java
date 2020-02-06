package com.dal.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@Table(name = "products", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank
    private String name;

    private String description;

    private Integer price;

    private Integer stock;

}
