package com.postal.apiprovider.controllers.user;

import com.postal.apiprovider.controllers.ApiResponse;
import com.postal.apiprovider.controllers.user.payload.UserInfo;
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

    public static final String CONSIDERING_USER_CHECK = "consideringUser";
    public static final String NOT_CONSIDERING_USER_CHECK = "notConsideringUser";

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public UserInfo getUserInfo(@CurrentUser UserPrincipal currentUser) {
        User user = userService.get(currentUser.getId());
        return new UserInfo(user);
    }

    @GetMapping("/checkloginavailability")
    @PreAuthorize("(#checkType == 'consideringUser' and hasRole('ROLE_USER')) or #checkType == 'notConsideringUser'")
    public ResponseEntity<ApiResponse> checkLoginAvailability(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam String login,
            @RequestParam String checkType) {

        boolean available = false;

        if (checkType.equals(NOT_CONSIDERING_USER_CHECK)) {
            available = !userService.existByLogin(login);
        } else if (checkType.equals(CONSIDERING_USER_CHECK)) {
            available = !userService.existByLoginExcludeCurrentLogin(login, currentUser.getUsername());
        }

        return ResponseEntity.ok(
                new ApiResponse(available, String.format("Login is %s available", (available ? "" : "not")))
        );
    }

    @GetMapping("/checkemailavailability")
    @PreAuthorize("(#checkType == 'consideringUser' and hasRole('ROLE_USER')) or #checkType == 'notConsideringUser'")
    public ResponseEntity<ApiResponse> checkEmailAvailability(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam String email,
            @RequestParam(required = false) String checkType) {

        boolean available = false;

        if (checkType.equals(NOT_CONSIDERING_USER_CHECK)) {
            available = !userService.existByEmail(email);
        } else if (checkType.equals(CONSIDERING_USER_CHECK)) {
            available = !userService.existByEmailExcludeCurrentEmail(email, currentUser.getEmail());
        }

        return ResponseEntity.ok(
                new ApiResponse(available, String.format("Email is %s available", (available ? "" : "not")))
        );
    }
}
