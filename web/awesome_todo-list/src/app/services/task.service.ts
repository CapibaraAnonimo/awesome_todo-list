import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskResponse } from '../interfaces/task-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateTaskStatus } from '../interfaces/update-task-status';
import { CreateTask } from '../interfaces/create-task';
import { PatchTask } from '../interfaces/patch-task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasksByUser(id: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(
      `${environment.apiBaseUrl}/task/user/${id}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer '),
      }
    );
  }

  changeStatus(id: string, status: UpdateTaskStatus): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(
      `${environment.apiBaseUrl}/task/status/${id}`,
      JSON.stringify(status),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ')
          .set('Content-Type', 'application/json'),
      }
    );
  }

  postTask(createTask: CreateTask): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${environment.apiBaseUrl}/task`,
      JSON.stringify(createTask),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ')
          .set('Content-Type', 'application/json'),
      }
    );
  }

  patchTask(id: string, patchTask: PatchTask): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(
      `${environment.apiBaseUrl}/task/${id}`,
      JSON.stringify(patchTask),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ')
          .set('Content-Type', 'application/json'),
      }
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/task/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '),
    });
  }
}
