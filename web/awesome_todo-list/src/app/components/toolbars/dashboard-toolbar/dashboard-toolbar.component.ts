import { Component, EventEmitter, Output } from '@angular/core';
import { NewTaskDialogComponent } from '../../dialogs/new-task-dialog/new-task-dialog.component';
import { UserResponse } from 'src/app/interfaces/user-response';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { TaskResponse } from 'src/app/interfaces/task-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.css'],
})
export class DashboardToolbarComponent {
  @Output() changeUserEvent = new EventEmitter<UserResponse>();
  @Output() newTaskEvent = new EventEmitter<TaskResponse>();

  users: UserResponse[] = [];

  current_user!: UserResponse;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.current_user = authService.getCurrentUser();
  }

  openDialogNewTask() {
    console.log("dialogo")
    console.log(this.current_user);
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: this.current_user.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newTaskEvent.emit(result);
      }
    });
  }

  logOut() {
    this.authService.logout();
  }
}
