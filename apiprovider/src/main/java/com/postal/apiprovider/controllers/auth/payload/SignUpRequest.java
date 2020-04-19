package com.postal.apiprovider.controllers.auth.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author SIE
 */
public class SignUpRequest {

    @NotBlank
    @Size(min = 2, max = 100)
    @Pattern(regexp = "^[a-zA-Z0-9_-]{5,100}$")
    private String login;

    @NotBlank
    @Email
    @Size(min = 2, max = 100)
    private String email;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,50}$")
    private String password;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,50}$")
    private String confirmPassword;

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

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
