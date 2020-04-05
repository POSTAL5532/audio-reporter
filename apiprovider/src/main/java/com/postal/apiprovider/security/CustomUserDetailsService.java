package com.postal.apiprovider.security;

import com.postal.apiprovider.services.UserService;
import com.postal.dataprovider.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Сервис для получения {@link UserPrincipal}
 *
 * @author SIE
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserService userService;

    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String loginOrEmail) throws UsernameNotFoundException {
        User user = this.userService.getByLoginOrEmail(loginOrEmail);

        return UserPrincipal.create(user);
    }

    public UserDetails loadUserById(String id) throws UsernameNotFoundException {
        return UserPrincipal.create(this.userService.get(id));
    }
}
