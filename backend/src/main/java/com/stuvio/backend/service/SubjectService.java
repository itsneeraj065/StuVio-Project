package com.stuvio.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.subject.SubjectDTO;
import com.stuvio.backend.entity.Semester;
import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.repository.SemesterRepository;
import com.stuvio.backend.repository.SubjectRepository;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    public Subject createSubject(SubjectDTO dto) {

        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        if (subjectRepository.findBySubjectCode(dto.getSubjectCode()).isPresent()) {
            throw new RuntimeException("Subject code already exists");
        }

        Subject subject = Subject.builder()
                .subjectCode(dto.getSubjectCode())
                .subjectName(dto.getSubjectName())
                .description(dto.getDescription())
                .credits(dto.getCredits())
                .semester(semester)
                .build();

        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public List<Subject> getSubjectsBySemester(Long semesterId) {
        Semester semester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new RuntimeException("Semester not found"));

        return subjectRepository.findBySemester(semester);
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }
}