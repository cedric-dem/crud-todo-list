import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Input() buttonText: string = 'Create';

  @Output() formSubmit = new EventEmitter<any>();

  @Input() task: Task = {
    id: 0,
    title: '',
    content: '',
    completed: false,
    importance: '',
    dateCreation: null,
    dueDate: '',
  };

  @Output() cancel = new EventEmitter<void>();

  submit() {
    this.formSubmit.emit(this.task);
  }

  onCancel() {
    this.cancel.emit();
  }
}
