import {Component, OnInit, inject, NgModule} from '@angular/core';
import {TaskService} from './services/task.service';
import {TestService} from './services/test';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Task} from './models/task.model';
import {RouterOutlet} from '@angular/router';
import {formatDistanceToNow} from 'date-fns';
import {TaskForm} from './task-form/task-form';
import {BrowserModule} from '@angular/platform-browser';

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


  private importanceOrder: Record<Importance, number> = {
    Low: 1,
    Medium: 2,
    High: 3
  };

  editedTask: Task | null = null;
  showEditPopup = false;

  task: Task = {
    id: 0,
    title: '',
    content: '',
    completed: false,
    importance: "Low",
    dateCreation: null,
    dueDate: '',
  };

  sortBy: 'dueDate' | 'dateCreation' | 'importance' | 'title' = 'dueDate';
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
          importance: 'Low',
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
    return formatDistanceToNow(new Date(dateString), {addSuffix: true});
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
    this.editedTask = {...task};
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
    if (this.sortBy === 'dueDate' || this.sortBy === 'dateCreation') { //if sort by date
      this.tasks.sort((a, b) => {
        const dateA = new Date(a[this.sortBy] || '');
        const dateB = new Date(b[this.sortBy] || '');

        if (this.sortOrder === 'asc') {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      });
    } else if (this.sortBy === 'importance') {
      this.tasks.sort((a, b) => {

        const a_importance_index = this.importanceOrder[a.importance];
        const b_importance_index = this.importanceOrder[b.importance];

        if (this.sortOrder === 'asc') {
          return a_importance_index - b_importance_index;
        } else {
          return b_importance_index - a_importance_index;
        }

      });
    } else if (this.sortBy === 'title') {
      this.tasks.sort((a, b) => {

        const a_title: string = a.title || '';
        const b_title: string = b.title || '';

        if (this.sortOrder === 'asc') {
          return a_title.localeCompare(b_title);
        } else {
          return b_title.localeCompare(a_title);
        }
      });
    }
  }
}
