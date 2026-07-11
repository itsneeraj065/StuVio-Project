package com.stuvio.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.video.VideoDTO;
import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.entity.User;
import com.stuvio.backend.entity.Video;
import com.stuvio.backend.repository.SubjectRepository;
import com.stuvio.backend.repository.UserRepository;
import com.stuvio.backend.repository.VideoRepository;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Video createVideo(VideoDTO dto) {

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User uploadedBy = userRepository.findById(dto.getUploadedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Video video = Video.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .youtubeUrl(dto.getYoutubeUrl())
                .uploadedAt(LocalDateTime.now())
                .subject(subject)
                .uploadedBy(uploadedBy)
                .build();

        return videoRepository.save(video);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public List<Video> getVideosBySubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return videoRepository.findBySubject(subject);
    }

    public Video getVideoById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found"));
    }
}