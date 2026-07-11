package com.stuvio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.video.VideoDTO;
import com.stuvio.backend.entity.Video;
import com.stuvio.backend.service.VideoService;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public Video createVideo(@RequestBody VideoDTO dto) {
        return videoService.createVideo(dto);
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/subject/{subjectId}")
    public List<Video> getVideosBySubject(@PathVariable Long subjectId) {
        return videoService.getVideosBySubject(subjectId);
    }

    @GetMapping("/{id}")
    public Video getVideoById(@PathVariable Long id) {
        return videoService.getVideoById(id);
    }
}