package com.postal.apiprovider.controllers.user.payload;

import com.postal.dataprovider.models.User;
import com.postal.dataprovider.models.UserConfirmStatus;

import java.time.LocalDate;

/**
 * @author SIE
 */
public class UserInfo {

    private String login;

    private String email;

    private LocalDate regDate;

    private UserConfirmStatus confirmStatus;

    public UserInfo(User user) {
        this.login = user.getLogin();
        this.email = user.getEmail();
        this.regDate = user.getRegDate().toLocalDate();
        this.confirmStatus = user.getConfirmStatus();
    }

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

    public LocalDate getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDate regDate) {
        this.regDate = regDate;
    }

    public UserConfirmStatus getConfirmStatus() {
        return confirmStatus;
    }

    public void setConfirmStatus(UserConfirmStatus confirmStatus) {
        this.confirmStatus = confirmStatus;
    }
}
