package com.postal.apiprovider.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * EntryPoint для логированияч и трансляции ошибки авторизации в HTTP ответ
 *
 * @author SIE
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest req, HttpServletResponse resp, AuthenticationException e) throws IOException {

        logger.error("Responding with security error. Message - {}", e.getMessage());

        SecurityErrorMessage responseMessage;
        int responseCode;

        Class<?> exceptionClass = e.getClass();
        if (exceptionClass.isAssignableFrom(BadCredentialsException.class)) {
            responseMessage = SecurityErrorMessage.BAD_CREDENTIALS;
            responseCode = HttpServletResponse.SC_UNAUTHORIZED;
        } else if (exceptionClass.isAssignableFrom(InsufficientAuthenticationException.class)) {
            responseMessage = SecurityErrorMessage.INSUFFICIENT_AUTH;
            responseCode = HttpServletResponse.SC_FORBIDDEN;
        } else if (exceptionClass.isAssignableFrom(DisabledException.class)) {
            responseMessage = SecurityErrorMessage.USER_DISABLED;
            responseCode = HttpServletResponse.SC_FORBIDDEN;
        } else if (exceptionClass.isAssignableFrom(LockedException.class)) {
            responseMessage = SecurityErrorMessage.USER_BLOCKED;
            responseCode = HttpServletResponse.SC_FORBIDDEN;
        } else {
            responseMessage = SecurityErrorMessage.UNKNOWN_SECURITY_ERROR;
            responseCode = HttpServletResponse.SC_FORBIDDEN;
        }

        resp.sendError(responseCode, responseMessage.name());
    }
}
