import { Component, OnInit, inject, NgModule } from '@angular/core';
import { TaskService } from './services/task.service';
import { TestService } from './services/test';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { RouterOutlet } from '@angular/router';
import { formatDistanceToNow } from 'date-fns';
import { TaskForm } from './task-form/task-form';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, TaskForm],
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private taskService = inject(TaskService);
  private testService = inject(TestService);

  editedTask: Task | null = null;
  showEditPopup = false;

  task: Task = {
    id: 0,
    title: '',
    content: '',
    completed: false,
    importance: '',
    dateCreation: null,
    dueDate: '',
  };

  sortBy: 'dueDate' | 'dateCreation' = 'dueDate';
  sortOrder: 'asc' | 'desc' = 'asc';

  createdTask: Task | null = null;

  tasks: Task[] = [];

  response = '';

  ngOnInit() {
    this.testService.getTest().subscribe({
      next: (res) => (this.response = res),
      error: (err) => (this.response = 'Error : ' + err.message),
    });

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (err) => console.error('Error loading tasks', err),
    });
    this.sortTasks();
  }

  createTask(taskData: any) {
    this.taskService.createTask(this.task).subscribe({
      next: (res) => {
        this.createdTask = res;
        this.task = {
          id: 0,
          title: '',
          content: '',
          completed: false,
          importance: '',
          dateCreation: null,
          dueDate: '',
        };
        this.loadTasks();
      },
      error: (err) => console.error('Error Creating task', err),
    });
  }

  setTaskCompleted(task: Task) {
    this.taskService.setTaskCompleted(task.id).subscribe({
      next: () => {
        task.completed = true;
        this.loadTasks();
      },
      error: (err) => console.error('Error setting task as completed', err),
    });
  }

  getRelativeDate(dateString: string): string {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }

  removeTaskFromCompleted(task: Task) {
    this.taskService.removeTaskFromCompleted(task.id).subscribe({
      next: () => {
        task.completed = false;
        this.loadTasks();
      },
      error: (err) => console.error('Error removing task from completed', err),
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => console.error('Error deleting task', err),
    });
  }

  openEditPopup(task: Task) {
    this.editedTask = { ...task };
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
    this.editedTask = null;
  }

  updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.loadTasks();
        this.closeEditPopup();
      },
      error: (err) => console.error('Error updating task', err),
    });
    this.closeEditPopup();
  }

  sortTasks(): void {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a[this.sortBy] || '');
      const dateB = new Date(b[this.sortBy] || '');

      if (this.sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }
}
