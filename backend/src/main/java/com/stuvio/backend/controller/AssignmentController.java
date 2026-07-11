package com.stuvio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.assignment.AssignmentDTO;
import com.stuvio.backend.entity.Assignment;
import com.stuvio.backend.service.AssignmentService;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment createAssignment(@RequestBody AssignmentDTO dto) {
        return assignmentService.createAssignment(dto);
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("/subject/{subjectId}")
    public List<Assignment> getAssignmentsBySubject(@PathVariable Long subjectId) {
        return assignmentService.getAssignmentsBySubject(subjectId);
    }

    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id);
    }
}