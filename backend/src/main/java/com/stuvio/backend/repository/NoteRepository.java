package com.stuvio.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stuvio.backend.entity.Note;
import com.stuvio.backend.entity.Subject;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findBySubject(Subject subject);
}