package com.postal.apiprovider.payload;

import com.postal.dataprovider.models.User;
import com.postal.dataprovider.models.UserStatus;

import java.time.LocalDate;

/**
 * @author SIE
 */
public class UserInfo {

    private String login;

    private String email;

    private LocalDate regDate;

    private UserStatus status;

    public UserInfo(User user) {
        this.login = user.getLogin();
        this.email = user.getEmail();
        this.regDate = user.getRegDate().toLocalDate();
        this.status = user.getStatus();
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

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}
