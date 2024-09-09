import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user.entity';
import { Quiz } from '../quizzes/quiz.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @Column()
  score: number;

  @Column({ type: 'jsonb', nullable: true }) // Allow this column to be nullable
  selectedAnswers: { questionId: number; answer: string }[];  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  takenAt: Date;
}
