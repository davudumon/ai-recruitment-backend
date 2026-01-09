import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { JobVacanciesService } from './job-vacancies.service';
import { CreateJobVacancyDto } from './dto/create-job-vacancy.dto';
import { UpdateJobVacancyDto } from './dto/update-job-vacancy.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('job-vacancies')
export class JobVacanciesController {
    constructor(private readonly service: JobVacanciesService) { }

    @Post()
    create(@Body() dto: CreateJobVacancyDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiQuery({
        name: 'title',
        required: false,
        type: String,
        description: 'Cari lowongan berdasarkan judul'
    })
    findAll(@Query('title') title?: string) {
        return this.service.findAll({ title });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobVacancyDto) {
        return this.service.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id)
    }
}
