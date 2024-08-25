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
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../dialogs/edit-task-dialog/edit-task-dialog.component';

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

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

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
      let updatedTaskStatus: UpdateTaskStatus = { status: newStatus! };

      this.taskService
        .changeStatus(movedTask.id, updatedTaskStatus)
        .subscribe((response) => {
          if (response.status === TaskStatus.TO_DO) {
            this.replaceTask(this.todo, response);
          } else if (response.status === TaskStatus.IN_PROGRESS) {
            this.replaceTask(this.inprogress, response);
          } else if (response.status === TaskStatus.DONE) {
            this.replaceTask(this.done, response);
          }
        });
    }
    this.todo.sort((a, b) => this.sortDate(a, b));
    this.inprogress.sort((a, b) => this.sortDate(a, b));
    this.done.sort((a, b) => this.sortDate(a, b));
  }

  replaceTask(list: TaskResponse[], task: TaskResponse) {
    let index = list.findIndex((list_task) => list_task.id === task.id);
    if (~index) {
      list[index] = task;
    } else {
      list.push(task);
    }
  }

  getUserTasks(user: UserResponse) {
    this.current_user = user;
    this.todo = [];
    this.inprogress = [];
    this.done = [];
    this.taskService
      .getTasksByUser(this.current_user.id)
      .subscribe((response) => {
        response
          .sort((a, b) => {
            return this.sortDate(a, b);
          })
          .forEach((element) => {
            if (element.status === TaskStatus.TO_DO) {
              this.todo.push(element);
            } else if (element.status === TaskStatus.IN_PROGRESS) {
              this.inprogress.push(element);
            } else if (element.status === TaskStatus.DONE) {
              this.done.push(element);
            }
          });
      });
  }

  addNewTask(newTask: TaskResponse) {
    this.todo.push(newTask);
  }

  openDialogEditTask(task: TaskResponse) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.status === TaskStatus.TO_DO) {
          this.replaceTask(this.todo, result);
        } else if (result.status === TaskStatus.IN_PROGRESS) {
          this.replaceTask(this.inprogress, result);
        } else if (result.status === TaskStatus.DONE) {
          this.replaceTask(this.done, result);
        } else if (result === -1) {
          this.removeItemOnce(this.todo, task);
          this.removeItemOnce(this.inprogress, task);
          this.removeItemOnce(this.done, task);
        }
      }
    });
  }

  removeItemOnce<T>(array: T[], item: T) {
    var index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return item;
  }

  parseDateString(dateString: string): Date | null {
    const [datePart, timePart] = dateString.split(', ');

    const [day, month, year] = datePart.split('/').map(Number);

    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  sortDate(a: TaskResponse, b: TaskResponse) {
    const dateA = this.parseDateString(a.creationDate);
    const dateB = this.parseDateString(b.creationDate);

    if (dateA && dateB) {
      return dateA.getTime() - dateB.getTime();
    } else {
      return 0;
    }
  }
}
