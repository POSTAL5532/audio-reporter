package com.postal.dataprovider.repositories;

import com.postal.dataprovider.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByLoginOrEmail(String login, String email);

    Optional<User> findById(String id);

    Boolean existsByLogin(String login);

    Boolean existsByEmail(String email);
}
