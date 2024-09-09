import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { AuthGuard } from '@nestjs/passport';
import { Quiz } from '../quizzes/quiz.entity';
import { User } from '../user.entity';
import { CurrentUser } from '../auth/current-user.decorator'; // A custom decorator to get the current user from JWT

@Controller('results')
@UseGuards(AuthGuard('jwt'))
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  async saveResult(
    @CurrentUser() user: User,
    @Body('quiz') quiz: Quiz,
    @Body('score') score: number,
    @Body('selectedAnswers') selectedAnswers: { questionId: number; answer: string }[], // Accept selected answers
  ) {
    return this.resultsService.saveResult(user, quiz, score, selectedAnswers);
  }
  
  @Get('/user/:userId')
  async findResultsByUser(@Param('userId') userId: number) {
    return this.resultsService.findResultsByUser(userId);
  }
}
