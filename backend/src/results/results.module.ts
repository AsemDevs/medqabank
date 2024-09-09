import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result])], // Register the Result entity here
  providers: [ResultsService],
  controllers: [ResultsController],
})
export class ResultsModule {}
