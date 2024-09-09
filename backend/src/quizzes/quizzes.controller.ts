import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
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
  @Get(':id') // Route to fetch a quiz by ID
  findOne(@Param('id') id: number): Promise<Quiz> {
    return this.quizzesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() quizData: Partial<Quiz>): Promise<Quiz> {
    return this.quizzesService.create(quizData);
  }
}
