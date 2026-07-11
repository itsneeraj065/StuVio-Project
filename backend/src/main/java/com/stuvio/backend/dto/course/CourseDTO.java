package com.stuvio.backend.dto.course;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseDTO {

    private String courseName;

    private String description;
    
    private Integer totalSemesters;
}