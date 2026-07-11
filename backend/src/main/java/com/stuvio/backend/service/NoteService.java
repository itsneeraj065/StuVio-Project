package com.stuvio.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stuvio.backend.dto.note.NoteDTO;
import com.stuvio.backend.entity.Note;
import com.stuvio.backend.entity.Subject;
import com.stuvio.backend.entity.User;
import com.stuvio.backend.repository.NoteRepository;
import com.stuvio.backend.repository.SubjectRepository;
import com.stuvio.backend.repository.UserRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Note createNote(NoteDTO dto) {

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User uploadedBy = userRepository.findById(dto.getUploadedByUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = Note.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .fileUrl(dto.getFileUrl())
                .fileType(dto.getFileType())
                .fileSize(dto.getFileSize())
                .uploadedAt(LocalDateTime.now())
                .subject(subject)
                .uploadedBy(uploadedBy)
                .build();

        return noteRepository.save(note);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public List<Note> getNotesBySubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        return noteRepository.findBySubject(subject);
    }

    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
    }
}