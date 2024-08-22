import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskResponse } from '../interfaces/task-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasksByUser(id: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(
      `${environment.apiBaseUrl}/task/user/${id}`
    );
  }
}
