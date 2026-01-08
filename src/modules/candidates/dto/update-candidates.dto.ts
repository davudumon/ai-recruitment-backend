import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidates.dto';

export class UpdateCandidatesDto extends PartialType(CreateCandidateDto) {}
