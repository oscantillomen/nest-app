import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getTasks(query: any) {
    console.log('Query:', query);
    return this.tasks;
  }

  getTask(id: number) {
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      return new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound;
  }

  createTask(task: CreateTaskDTO) {
    this.tasks.push(task);
    return task;
  }
}
