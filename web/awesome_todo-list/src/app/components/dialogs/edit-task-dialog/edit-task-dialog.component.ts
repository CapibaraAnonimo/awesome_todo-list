import { Component, Inject } from '@angular/core';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { CreateTask } from 'src/app/interfaces/create-task';
import { TaskResponse } from 'src/app/interfaces/task-response';
import { PatchTask } from 'src/app/interfaces/patch-task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent {
  title: string = '';
  description: string = '';
  taskError = false;
  errorMessages: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskResponse,
    private taskService: TaskService
  ) {
    this.title = data.title;
    this.description = data.description;
  }

  editTask() {
    let patchTask: PatchTask = {
      title: this.title,
      description: this.description,
    };
    this.taskService.patchTask(this.data.id, patchTask).subscribe({
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

  openConfirm() {
    if (confirm('¿Estás seguro de querer borrar esta tarea?')) {
      this.taskService.deleteTask(this.data.id).subscribe(() => {
        this.dialogRef.close(-1);
      });
    }
  }
}
