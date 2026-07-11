package com.stuvio.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stuvio.backend.entity.User;
import com.stuvio.backend.enums.UserRole;
import com.stuvio.backend.repository.UserRepository;
import com.stuvio.backend.dto.auth.RegisterRequest;
import com.stuvio.backend.dto.auth.LoginRequest;
import com.stuvio.backend.security.jwt.JwtUtil;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil ;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // REGISTER
    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "User already exists with this email";
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public String loginUser(LoginRequest request) {

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return "Invalid email or password";
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid email or password";
        }

        // 🔥 GENERATE TOKEN
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return token;
    }
}