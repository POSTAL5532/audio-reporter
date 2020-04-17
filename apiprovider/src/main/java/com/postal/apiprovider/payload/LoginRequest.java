package com.postal.apiprovider.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * @author SIE
 */
public class LoginRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9._@-]{5,100}$")
    private String loginOrEmail;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,100}$")
    private String password;

    public String getLoginOrEmail() {
        return loginOrEmail;
    }

    public void setLoginOrEmail(String loginOrEmail) {
        this.loginOrEmail = loginOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
