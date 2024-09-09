import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  // Get all quizzes
  findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  // Get a specific quiz by its ID
  findOne(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({ where: { id } });
  }

  // Create a new quiz
  create(quizData: Partial<Quiz>): Promise<Quiz> {
    const quiz = this.quizRepository.create(quizData);
    return this.quizRepository.save(quiz);
  }
}
