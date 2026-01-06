import { Module } from '@nestjs/common';
import { JobVacanciesController } from './job-vacancies.controller';
import { JobVacanciesService } from './job-vacancies.service';
import { JobVacancyRepository } from './job-vacancies.repository';

@Module({
  providers: [JobVacanciesService, JobVacancyRepository],
  controllers: [JobVacanciesController]
})
export class JobVacanciesModule {}
