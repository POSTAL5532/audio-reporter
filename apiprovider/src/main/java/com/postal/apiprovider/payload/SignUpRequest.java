package com.postal.apiprovider.payload;

import javax.validation.constraints.NotBlank;

/**
 * @author SIE
 */
public class SignUpRequest {

    @NotBlank
    private String login;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
