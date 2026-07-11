package com.stuvio.backend.dto.assignment;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentDTO {

    private String title;
    private String description;
    private LocalDate dueDate;
    private String attachmentUrl;
    private Long subjectId;
    private Long uploadedByUserId;
}