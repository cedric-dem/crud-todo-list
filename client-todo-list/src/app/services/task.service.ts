import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  setTaskCompleted(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/complete`, {});
  }

  removeTaskFromCompleted(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/uncomplete`, {});
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateTask(task: Task) {
    return this.http.put(`${this.baseUrl}/${task.id}`, task);
  }
}
