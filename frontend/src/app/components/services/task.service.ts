
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8081/tache';

  constructor(private http: HttpClient) {}

  
  postTask(task: Task) {
    return this.http.post<Task>(this.baseUrl, task);
  }
}
