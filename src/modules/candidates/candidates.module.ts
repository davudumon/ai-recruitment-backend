import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidateRepository } from './candidates.repository';
import { AiService } from '../../common/services/ai.services';
import { SupabaseService } from 'src/common/services/supabase.service';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, CandidateRepository, AiService, SupabaseService]
})
export class CandidatesModule { }
