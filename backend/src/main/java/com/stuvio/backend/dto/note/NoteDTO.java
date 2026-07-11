package com.stuvio.backend.dto.note;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteDTO {

    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private Long subjectId;
    private Long uploadedByUserId;
}