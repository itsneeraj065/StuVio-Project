package com.stuvio.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.assignment.AssignmentDTO;
import com.stuvio.backend.entity.Assignment;
import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.entity.User;
import com.stuvio.backend.repository.AssignmentRepository;
import com.stuvio.backend.repository.SubjectRepository;
import com.stuvio.backend.repository.UserRepository;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Assignment createAssignment(AssignmentDTO dto) {

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User uploadedBy = userRepository.findById(dto.getUploadedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Assignment assignment = Assignment.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .attachmentUrl(dto.getAttachmentUrl())
                .uploadedAt(LocalDateTime.now())
                .subject(subject)
                .uploadedBy(uploadedBy)
                .build();

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Assignment> getAssignmentsBySubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return assignmentRepository.findBySubject(subject);
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
    }
}