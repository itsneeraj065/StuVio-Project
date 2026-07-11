package com.stuvio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.semester.SemesterDTO;
import com.stuvio.backend.entity.Semester;
import com.stuvio.backend.service.SemesterService;

@RestController
@RequestMapping("/api/semester")
public class SemesterController {

    @Autowired
    private SemesterService semesterService;

    @PostMapping
    public Semester createSemester(@RequestBody SemesterDTO dto) {
        return semesterService.createSemester(dto);
    }

    @GetMapping
    public List<Semester> getAllSemesters() {
        return semesterService.getAllSemesters();
    }

    @GetMapping("/course/{courseId}")
    public List<Semester> getSemestersByCourse(@PathVariable Long courseId) {
        return semesterService.getSemestersByCourse(courseId);
    }
}