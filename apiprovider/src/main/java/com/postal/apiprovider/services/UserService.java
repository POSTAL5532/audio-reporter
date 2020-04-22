package com.postal.apiprovider.services;

import com.postal.dataprovider.models.User;
import com.postal.dataprovider.models.UserConfirmStatus;
import com.postal.dataprovider.models.UserRole;
import com.postal.dataprovider.models.UserStatus;
import com.postal.dataprovider.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() {
        return new ArrayList<>(this.userRepository.findAll());
    }

    public User get(String id) {
        return this.userRepository
                .findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
    }

    public User getByLoginOrEmail(String loginOrEmail) {
        return this.userRepository
                .findByLoginOrEmail(loginOrEmail, loginOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with login or email : " + loginOrEmail));
    }

    @Transactional(readOnly = false)
    public User register(User newUser) {
        newUser.setRole(UserRole.ROLE_USER);
        newUser.setRegDate(Date.valueOf(LocalDate.now()));
        newUser.setStatus(UserStatus.ACTIVE);
        newUser.setConfirmStatus(UserConfirmStatus.UNCONFIRMED);

        return this.userRepository.save(newUser);
    }

    @Transactional(readOnly = false)
    public void delete(String id) {
        this.userRepository.deleteById(id);
    }

    public Boolean existByLogin(String login) {
        return this.userRepository.existsByLogin(login);
    }

    public Boolean existByLoginExcludeCurrentLogin(String login, String currentUserLogin) {
        return this.userRepository.existsByLoginAndLoginNot(login, currentUserLogin);
    }

    public Boolean existByEmail(String email) {
        return this.userRepository.existsByEmail(email);
    }

    public Boolean existByEmailExcludeCurrentEmail(String email, String currentUserEmail) {
        return this.userRepository.existsByEmailAndEmailNot(email, currentUserEmail);
    }

    @Transactional(readOnly = false)
    public User changeUserPersonalData(String userId, String login, String email) {
        User user = get(userId);
        user.setLogin(login);

        if (!user.getEmail().equals(email)) {
            user.setEmail(email);
            user.setConfirmStatus(UserConfirmStatus.UNCONFIRMED);
        }

        return userRepository.save(user);
    }

    @Transactional(readOnly = false)
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));

        if (!user.getPassword().equals(newPassword)) {
            userRepository.save(user);
        }
    }
}
