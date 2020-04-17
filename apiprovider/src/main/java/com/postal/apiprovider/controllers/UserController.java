package com.postal.apiprovider.controllers;

import com.postal.apiprovider.payload.ApiResponse;
import com.postal.apiprovider.payload.UserInfo;
import com.postal.apiprovider.security.CurrentUser;
import com.postal.apiprovider.security.UserPrincipal;
import com.postal.apiprovider.services.UserService;
import com.postal.dataprovider.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/checkloginavailability")
    public ResponseEntity<ApiResponse> checkLoginAvailability(@RequestParam String login) {
        boolean available = !userService.existByLogin(login);
        String message = String.format("Login is %s available", (available ? "" : "not"));
        return ResponseEntity.ok(new ApiResponse(available, message));
    }

    @GetMapping("/checkemailavailability")
    public ResponseEntity<ApiResponse> checkEmailAvailability(@RequestParam String email) {
        boolean available = !userService.existByEmail(email);
        String message = String.format("Email is %s available", (available ? "" : "not"));
        return ResponseEntity.ok(new ApiResponse(available, message));
    }
}
