import { PartialType } from '@nestjs/mapped-types';
import { CreateJobVacancyDto } from './create-job-vacancy.dto';

export class UpdateJobVacancyDto extends PartialType(CreateJobVacancyDto) {}
