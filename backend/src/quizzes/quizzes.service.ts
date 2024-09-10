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

  // Get all quizzes and dynamically add question IDs
  async findAll(): Promise<Quiz[]> {
    const quizzes = await this.quizRepository.find();
    return quizzes.map((quiz) => ({
      ...quiz,
      questions: quiz.questions.map((question, index) => ({
        id: index + 1, // Assign an ID to each question
        ...question,
      })),
    }));
  }

  // Get a specific quiz by its ID and dynamically add question IDs
  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (quiz) {
      quiz.questions = quiz.questions.map((question, index) => ({
        id: index + 1, // Assign an ID to each question
        ...question,
      }));
    }
    return quiz;
  }

  // Create a new quiz
  create(quizData: Partial<Quiz>): Promise<Quiz> {
    const quiz = this.quizRepository.create(quizData);
    return this.quizRepository.save(quiz);
  }
}
