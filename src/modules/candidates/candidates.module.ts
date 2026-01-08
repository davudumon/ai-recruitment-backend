import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidateRepository } from './candidates.repository';
import { cvService } from './services/cv.services';
import { AiService } from './services/ai.services';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, CandidateRepository, cvService, AiService]
})
export class CandidatesModule { }
