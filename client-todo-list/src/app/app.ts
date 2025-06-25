import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { TestService } from './services/test';


@Component({
  selector: 'app-root',
  imports: [],
  styleUrl: './app.css',
  template: `<p>{{ response }}</p>`,
})
export class App implements OnInit {
  protected title = 'client-todo-list';
  private testService = inject(TestService);
  response = '';

  ngOnInit() {
    this.testService.getTest().subscribe({
      next: res => this.response = res,
      error: err => this.response = 'Erreur : ' + err.message
    });
  }
}
