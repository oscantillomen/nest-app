import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('/tasks')
export class TaskController {
  taskService: TaskService;
  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTasks(@Query() query: any) {
    return this.taskService.getTasks(query);
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(parseInt(id));
  }

  @Post()
  createTask(@Body() task: CreateTaskDTO) {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(@Body() task: CreateTaskDTO, @Param('id') id: string) {
    return `Update task ${task.title} with id ${id}`;
  }
}
