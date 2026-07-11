package com.stuvio.backend.dto.video;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoDTO {

    private String title;
    private String description;
    private String youtubeUrl;
    private Long subjectId;
    private Long uploadedByUserId;
}