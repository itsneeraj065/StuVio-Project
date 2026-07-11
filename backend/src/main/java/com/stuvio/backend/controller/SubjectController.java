package com.stuvio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.subject.SubjectDTO;
import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping
    public Subject createSubject(@RequestBody SubjectDTO dto) {
        return subjectService.createSubject(dto);
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/semester/{semesterId}")
    public List<Subject> getSubjectsBySemester(@PathVariable Long semesterId) {
        return subjectService.getSubjectsBySemester(semesterId);
    }

    @GetMapping("/{id}")
    public Subject getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }
}