import { TaskStatus } from './task-status';

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  creationDate: string;
  user_id: string;
}
