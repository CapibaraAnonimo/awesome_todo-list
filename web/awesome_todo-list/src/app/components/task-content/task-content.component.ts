import { Component, Input } from '@angular/core';
import { TaskResponse } from 'src/app/interfaces/task-response';

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.css'],
})
export class TaskContentComponent {
  @Input() task!: TaskResponse;
}
