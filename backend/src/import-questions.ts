import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Quiz } from './quizzes/quiz.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

async function importQuestions() {
  // Create a NestJS app context to access the repository
  const app = await NestFactory.createApplicationContext(AppModule);

  // Get the Quiz repository via the app context
  const quizRepository = app.get('QuizRepository') as Repository<Quiz>;

  // Read the JSON file
  const data = JSON.parse(fs.readFileSync('src/dev.json', 'utf8')).data;

  // Create a new quiz and map questions
  const newQuiz = quizRepository.create({
    title: 'Development Set Quiz', // Modify title as needed
    questions: data.map((question: any) => ({
      text: question.question,
      options: question.question
        .match(/A:(.+), B:(.+), C:(.+), D:(.+), E:(.+)/)
        .slice(1, 6),
      correctAnswer: question.answer,
    })),
  });

  // Save the new quiz
  await quizRepository.save(newQuiz);

  console.log('Questions imported successfully');

  await app.close(); // Close the NestJS application context
}

importQuestions().catch(console.error);
