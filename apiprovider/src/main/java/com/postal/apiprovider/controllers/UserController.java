package com.postal.apiprovider.controllers;

import com.postal.apiprovider.services.UserService;
import com.postal.dataprovider.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(produces = "application/json")
    public String registerUSer(@RequestBody User newUser) {
        userService.register(newUser);
        return "testToken";
    }
}
