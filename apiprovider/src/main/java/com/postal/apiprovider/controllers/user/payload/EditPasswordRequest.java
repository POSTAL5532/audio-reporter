package com.postal.apiprovider.controllers.user.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * @author SIE
 */
public class EditPasswordRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,50}$")
    private String oldPassword;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,50}$")
    private String newPassword;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{5,50}$")
    private String confirmPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
