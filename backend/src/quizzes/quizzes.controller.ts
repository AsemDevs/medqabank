import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Quiz[]> {
    return this.quizzesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() quizData: Partial<Quiz>): Promise<Quiz> {
    return this.quizzesService.create(quizData);
  }
}
