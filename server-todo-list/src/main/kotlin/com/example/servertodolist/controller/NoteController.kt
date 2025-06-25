package com.example.servertodolist.controller

import models.Note
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = ["http://localhost:4200"])
class NoteController {

    @PostMapping
    fun createNote(@RequestBody note: Note): Note {
        println("received note : $note")
        // TODO
        return note
    }
}