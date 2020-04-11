package com.postal.apiprovider.controllers;

import com.postal.apiprovider.payload.UserInfo;
import com.postal.apiprovider.security.CurrentUser;
import com.postal.apiprovider.security.UserPrincipal;
import com.postal.apiprovider.services.UserService;
import com.postal.dataprovider.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public UserInfo getUserInfo(@CurrentUser UserPrincipal currentUser) {
        User user = userService.get(currentUser.getId());
        return new UserInfo(user);
    }
}
