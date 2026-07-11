package com.stuvio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stuvio.backend.dto.note.NoteDTO;
import com.stuvio.backend.entity.Note;
import com.stuvio.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note createNote(@RequestBody NoteDTO dto) {
        return noteService.createNote(dto);
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/subject/{subjectId}")
    public List<Note> getNotesBySubject(@PathVariable Long subjectId) {
        return noteService.getNotesBySubject(subjectId);
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }
}