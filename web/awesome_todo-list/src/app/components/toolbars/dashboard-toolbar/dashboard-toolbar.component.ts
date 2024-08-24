import { Component, EventEmitter, Output } from '@angular/core';
import { NewTaskDialogComponent } from '../../dialogs/new-task-dialog/new-task-dialog.component';
import { UserResponse } from 'src/app/interfaces/user-response';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { TaskResponse } from 'src/app/interfaces/task-response';

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

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.setUser(this.users[0]);
    });
  }

  setUser(user: UserResponse) {
    this.current_user = user;
    this.sendCurrentUser();
  }

  openDialogNewTask() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      data: this.current_user.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newTaskEvent.emit(result);
      }
    });
  }

  sendCurrentUser() {
    this.changeUserEvent.emit(this.current_user);
  }
}
