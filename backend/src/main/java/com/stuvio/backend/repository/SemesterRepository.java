package com.stuvio.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stuvio.backend.entity.Course;
import com.stuvio.backend.entity.Semester;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {

    List<Semester> findByCourse(Course course);

}