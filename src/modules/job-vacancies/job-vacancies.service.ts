import { Injectable, NotFoundException } from '@nestjs/common';
import { JobVacancyRepository } from './job-vacancies.repository';
import { CreateJobVacancyDto } from './dto/create-job-vacancy.dto';
import { UpdateJobVacancyDto } from './dto/update-job-vacancy.dto';

@Injectable()
export class JobVacanciesService {
  constructor(private readonly jobRepo: JobVacancyRepository) {}

  async create(dto: CreateJobVacancyDto) {
    const job = await this.jobRepo.create(dto);

    return {
      message: 'Job vacancy created successfully',
      data: job,
    };
  }

  async findAll() {
    const jobs = await this.jobRepo.findAll();

    return {
      message: 'Job vacancies retrieved successfully',
      data: jobs,
    };
  }

  async findOne(id: number) {
    const job = await this.jobRepo.findById(id);

    if (!job) {
      throw new NotFoundException('Job vacancy not found');
    }

    return {
      message: 'Job vacancy retrieved successfully',
      data: job,
    };
  }

  async update(id: number, dto: UpdateJobVacancyDto) {
    await this.findOne(id);

    const job = await this.jobRepo.update(id, dto);

    return {
      message: 'Job vacancy updated successfully',
      data: job,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.jobRepo.delete(id);

    return {
      message: 'Job vacancy deleted successfully',
      data: null,
    };
  }
}
