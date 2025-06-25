package com.example.servertodolist.controller

import models.Note
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = ["http://localhost:4200"])
class NoteController {

    @PostMapping
    fun createNote(@RequestBody note: Note): Note {
        notes.add(note)
        return note
    }
    
    private val notes = mutableListOf<Note>()

    @GetMapping
    fun getNotes(): List<Note> = notes


}