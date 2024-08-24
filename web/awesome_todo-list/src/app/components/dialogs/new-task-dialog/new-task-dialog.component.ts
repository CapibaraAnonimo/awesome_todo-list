import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { CreateTask } from 'src/app/interfaces/create-task';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
})
export class NewTaskDialogComponent {
  title: string = '';
  description: string = '';
  taskError = false;
  errorMessages: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private taskService: TaskService
  ) {}

  createTask() {
    let newTask: CreateTask = {
      title: this.title,
      description: this.description,
      user_id: this.data,
    };
    this.taskService.postTask(newTask).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        this.taskError = true;
        this.errorMessages = error.error.message;
      },
    });
  }

  closeWithoutData() {
    this.dialogRef.close();
  }
}
