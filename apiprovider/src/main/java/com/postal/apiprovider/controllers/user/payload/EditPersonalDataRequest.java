package com.postal.apiprovider.controllers.user.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author SIE
 */
public class EditPersonalDataRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9_-]{5,100}$")
    private String login;

    @NotBlank
    @Email
    @Size(min = 2, max = 100)
    private String email;

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
}
