package com.stuvio.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.course.CourseDTO;
import com.stuvio.backend.entity.Course;
import com.stuvio.backend.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course createCourse(CourseDTO dto) {

        Course course = Course.builder()
                .courseName(dto.getCourseName())
                .description(dto.getDescription())
                .totalSemesters(dto.getTotalSemesters())
                .build();

        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
}