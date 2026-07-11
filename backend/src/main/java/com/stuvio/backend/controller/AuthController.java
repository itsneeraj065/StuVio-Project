package com.stuvio.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.service.AuthService;
import com.stuvio.backend.dto.auth.RegisterRequest;
import com.stuvio.backend.dto.auth.LoginRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest request) {
        return authService.registerUser(request);
    }
    
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request) {
        return authService.loginUser(request);
    }
}