import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TaskResponse } from 'src/app/interfaces/task-response';
import { TaskStatus } from 'src/app/interfaces/task-status';
import { UserResponse } from 'src/app/interfaces/user-response';
import { UpdateTaskStatus } from 'src/app/interfaces/update-task-status';
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

  inprogress: TaskResponse[] = [];

  title = 'awesome_todo-list';

  users: UserResponse[] = [];

  current_user!: UserResponse;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      this.setUser(this.users[0]);
      // this.current_user = this.users[0];
      // this.taskService
      //   .getTasksByUser(this.current_user.id)
      //   .subscribe((response) => {
      //     this.todo.push(...response);
      //   });
    });
  }

  drop(event: CdkDragDrop<TaskResponse[]>) {
    const movedTask = event.item.data;
    let newStatus: TaskStatus;
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
      if (this.todo.includes(movedTask)) {
        newStatus = TaskStatus.TO_DO;
      } else if (this.inprogress.includes(movedTask)) {
        newStatus = TaskStatus.IN_PROGRESS;
      } else if (this.done.includes(movedTask)) {
        newStatus = TaskStatus.DONE;
      }
      let xStatus: UpdateTaskStatus = { status: newStatus! };

      this.taskService
        .changeStatus(movedTask.id, xStatus)
        .subscribe((response) => {
          if (response.status === TaskStatus.TO_DO) {
            this.replaceTask(this.todo, response);
          }
          if (response.status === TaskStatus.IN_PROGRESS) {
            this.replaceTask(this.inprogress, response);
          }
          if (response.status === TaskStatus.DONE) {
            this.replaceTask(this.done, response);
          }
          let newTask = response;
        });
    }
  }

  replaceTask(list: TaskResponse[], task: TaskResponse) {
    let index = list.findIndex((list_task) => list_task.id === task.id);
    if (~index) {
      list[index] = task;
    } else {
      list.push(task);
    }
  }

  setUser(user: UserResponse) {
    this.current_user = user;
    this.todo = [];
    this.inprogress = [];
    this.done = [];
    this.taskService
      .getTasksByUser(this.current_user.id)
      .subscribe((response) => {
        response.forEach((element) => {
          if (element.status === TaskStatus.TO_DO) {
            this.todo.push(element);
          }
          if (element.status === TaskStatus.IN_PROGRESS) {
            this.inprogress.push(element);
          }
          if (element.status === TaskStatus.DONE) {
            this.done.push(element);
          }
        });
      });
  }

  addTask() {
    
  }
}
