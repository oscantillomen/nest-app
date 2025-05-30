import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
