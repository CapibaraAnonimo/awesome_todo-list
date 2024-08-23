import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskResponse } from '../interfaces/task-response';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateTaskStatus } from '../interfaces/update-task-status';
import { CreateTask } from '../interfaces/create-task';

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

  changeStatus(id: string, status: UpdateTaskStatus): Observable<TaskResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.patch<TaskResponse>(
      `${environment.apiBaseUrl}/task/status/${id}`,
      JSON.stringify(status),
      { headers }
    );
  }

  postTask(createTask: CreateTask): Observable<TaskResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<TaskResponse>(
        `${environment.apiBaseUrl}/task`,
        JSON.stringify(createTask),
        { headers }
      );
  }

  private handleError(error: HttpErrorResponse) {
    // let errorMessage = 'Unknown error!';
    // if (error.error instanceof ErrorEvent) {
    //   // Client-side errors
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // Server-side errors
    //   errorMessage = `Server Error: ${error.status}\nMessage: ${error.error.message}`;
    // }
    // return throwError(errorMessage);
    return throwError(error);
  }
}
