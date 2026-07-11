package com.stuvio.backend.dto.subject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubjectDTO {

    private String subjectCode;
    private String subjectName;
    private String description;
    private Integer credits;
    private Long semesterId;
}