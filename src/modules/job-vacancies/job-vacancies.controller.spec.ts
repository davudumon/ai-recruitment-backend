import { Test, TestingModule } from '@nestjs/testing';
import { JobVacanciesController } from './job-vacancies.controller';

describe('JobVacanciesController', () => {
  let controller: JobVacanciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobVacanciesController],
    }).compile();

    controller = module.get<JobVacanciesController>(JobVacanciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
