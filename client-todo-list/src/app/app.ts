import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from './services/task.service';
import { TestService } from './services/test';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './models/task.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  styleUrls: ['./app.css'],
  templateUrl: './app.html'
})
export class App implements OnInit {


  private taskService = inject(TaskService);
  private testService = inject(TestService);

  task: Task = { title: '', content: '' };
  createdTask: Task | null = null;

  tasks: Task[] = [];

  response = '';

  ngOnInit() {
    this.testService.getTest().subscribe({
      next: res => this.response = res,
      error: err => this.response = 'Error : ' + err.message
    });

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: tasks => this.tasks = tasks,
      error: err => console.error('Error loading tasks', err)
    });
  }

  submit() {
    this.taskService.createTask(this.task).subscribe({
      next: res => {
        this.createdTask = res;
        this.task = { title: '', content: '' };
        this.loadTasks();
      },
      error: err => console.error('Error Creating task', err)
    });
  }
}
