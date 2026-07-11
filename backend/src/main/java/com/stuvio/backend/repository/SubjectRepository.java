package com.stuvio.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stuvio.backend.entity.Semester;
import com.stuvio.backend.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findBySemester(Semester semester);

    Optional<Subject> findBySubjectCode(String subjectCode);
}