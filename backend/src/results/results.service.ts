import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './result.entity';
import { User } from '../user.entity';
import { Quiz } from '../quizzes/quiz.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
  ) {}

  // Save a new quiz result
  // Save a new quiz result with selected answers
  async saveResult(
    user: User,
    quiz: Quiz,
    score: number,
    selectedAnswers: { questionId: number; answer: string }[],
  ): Promise<Result> {
    const result = this.resultsRepository.create({
      user,
      quiz,
      score,
      selectedAnswers, // Save the user's selected answers
    });
    return this.resultsRepository.save(result);
  }

  // Get all quiz results for a user
  async findResultsByUser(userId: number): Promise<Result[]> {
    return this.resultsRepository.find({
      where: { user: { id: userId } },
      relations: ['quiz'],
    });
  }
}
