package com.stuvio.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.user.ProfileDTO;
import com.stuvio.backend.entity.Profile;
import com.stuvio.backend.entity.User;
import com.stuvio.backend.repository.ProfileRepository;
import com.stuvio.backend.repository.UserRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public Profile getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepository.findByUser(user).orElse(null);
    }

    public Profile saveOrUpdateProfile(String email, ProfileDTO dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Profile> existingProfile = profileRepository.findByUser(user);

        Profile profile = existingProfile.orElse(new Profile());

        profile.setUser(user);
        profile.setCollege(dto.getCollege());
        profile.setBranch(dto.getBranch());
        profile.setSemester(dto.getSemester());
        profile.setBio(dto.getBio());

        return profileRepository.save(profile);
    }
}