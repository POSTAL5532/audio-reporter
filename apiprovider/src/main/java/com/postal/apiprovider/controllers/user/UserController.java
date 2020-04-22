package com.postal.apiprovider.controllers.user;

import com.postal.apiprovider.controllers.ApiResponse;
import com.postal.apiprovider.controllers.user.payload.EditPersonalDataRequest;
import com.postal.apiprovider.controllers.user.payload.UserInfo;
import com.postal.apiprovider.exception.BadRequestException;
import com.postal.apiprovider.security.CurrentUser;
import com.postal.apiprovider.security.UserPrincipal;
import com.postal.apiprovider.services.UserService;
import com.postal.dataprovider.models.User;
import com.postal.dataprovider.models.UserConfirmStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
            @RequestParam String checkType) {

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

    @PostMapping("/editpersonaldata")
    @PreAuthorize("hasRole('ROLE_USER')")
    public UserInfo editPersonalData(
            @CurrentUser UserPrincipal currentUser,
            @Valid @RequestBody EditPersonalDataRequest personalData) {

        if (userService.existByLoginExcludeCurrentLogin(personalData.getLogin(), currentUser.getUsername())) {
            throw new BadRequestException("Login is already taken!");
        } else if (userService.existByEmailExcludeCurrentEmail(personalData.getEmail(), currentUser.getEmail())) {
            throw new BadRequestException("Email is already taken!");
        }

        User user = userService.changeUserPersonalData(
                currentUser.getId(), personalData.getLogin(), personalData.getEmail()
        );

        if (user.getConfirmStatus().equals(UserConfirmStatus.UNCONFIRMED)) {
            //TODO sent Email point
        }

        return new UserInfo(user);
    }
}
