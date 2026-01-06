import { Test, TestingModule } from '@nestjs/testing';
import { JobVacanciesService } from './job-vacancies.service';

describe('JobVacanciesService', () => {
  let service: JobVacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobVacanciesService],
    }).compile();

    service = module.get<JobVacanciesService>(JobVacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
