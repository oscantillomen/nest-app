import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  me() {
    return {
      id: 1,
      email: 'oscar@cantillo.com',
      name: 'Oscar Cantillo',
      password: '123456',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns a list of all users',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              name: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
    },
    example: [
      {
        id: 1,
        email: 'oscar.cantillo@menco.com',
        name: 'Oscar Cantillo',
        password: '123456',
      },
    ],
  })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
