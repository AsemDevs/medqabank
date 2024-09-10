import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Title for the quiz

  @Column('jsonb')  // JSONB for storing multiple questions
  questions: { text: string; options: string[]; correctAnswer: string }[];
}
