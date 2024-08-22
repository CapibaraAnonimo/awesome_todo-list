import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TaskResponse } from 'src/app/interfaces/task-response';
import { UserResponse } from 'src/app/interfaces/user-response';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  todo: TaskResponse[] = [];

  done: TaskResponse[] = [];

  title = 'awesome_todo-list';

  users: UserResponse[] = [];

  current_user!: UserResponse;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.current_user = this.users[0];
      this.taskService
        .getTasksByUser(this.current_user.id)
        .subscribe((response) => {
          this.todo.push(...response);
        });
    });
  }

  drop(event: CdkDragDrop<TaskResponse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  setUser(user: UserResponse) {
    this.current_user = user;
    console.log(this.current_user);
  }
}
