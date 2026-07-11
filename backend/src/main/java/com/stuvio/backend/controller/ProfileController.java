package com.stuvio.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.user.ProfileDTO;
import com.stuvio.backend.entity.Profile;
import com.stuvio.backend.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public Profile getProfile(Authentication authentication) {

        String email = authentication.getName();

        return profileService.getProfile(email);
    }

    @PostMapping
    public Profile createProfile(Authentication authentication,
                                 @RequestBody ProfileDTO profileDTO) {

        String email = authentication.getName();

        return profileService.saveOrUpdateProfile(email, profileDTO);
    }

    @PutMapping
    public Profile updateProfile(Authentication authentication,
                                 @RequestBody ProfileDTO profileDTO) {

        String email = authentication.getName();

        return profileService.saveOrUpdateProfile(email, profileDTO);
    }
}