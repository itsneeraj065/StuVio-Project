package com.stuvio.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.semester.SemesterDTO;
import com.stuvio.backend.entity.Course;
import com.stuvio.backend.entity.Semester;
import com.stuvio.backend.repository.CourseRepository;
import com.stuvio.backend.repository.SemesterRepository;

@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Semester createSemester(SemesterDTO dto) {

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Business Validation
        if (dto.getSemesterNumber() > course.getTotalSemesters()) {
            throw new RuntimeException(
                    "Semester exceeds total semesters of this course");
        }

        Semester semester = Semester.builder()
                .semesterNumber(dto.getSemesterNumber())
                .course(course)
                .build();

        return semesterRepository.save(semester);
    }

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

    public List<Semester> getSemestersByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return semesterRepository.findByCourse(course);
    }

}