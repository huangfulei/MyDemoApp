package com.configuration.security.model;

import lombok.*;

import javax.persistence.Entity;

/**
 *
 * @author Fulei
 */

@Getter@Setter
@NoArgsConstructor @AllArgsConstructor @ToString
public class  AuthRequest {
	
	private String email;
	
	private String password;

}
