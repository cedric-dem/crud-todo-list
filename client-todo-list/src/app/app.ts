import { Component, OnInit, inject } from '@angular/core';
import { NoteService } from './services/note.service';
import { TestService } from './services/test';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from './models/note.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  styleUrls: ['./app.css'],
  templateUrl: './app.html'
})
export class App implements OnInit {


  private noteService = inject(NoteService);
  private testService = inject(TestService);

  note: Note = { title: '', content: '' };
  createdNote: Note | null = null;

  notes: Note[] = [];

  response = '';

  ngOnInit() {
    this.testService.getTest().subscribe({
      next: res => this.response = res,
      error: err => this.response = 'Error : ' + err.message
    });

    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe({
      next: notes => this.notes = notes,
      error: err => console.error('Error loading notes', err)
    });
  }

  submit() {
    this.noteService.createNote(this.note).subscribe({
      next: res => {
        this.createdNote = res;
        this.note = { title: '', content: '' };
        this.loadNotes();
      },
      error: err => console.error('Error Creating note', err)
    });
  }
}
