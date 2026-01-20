import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { JobVacanciesService } from './job-vacancies.service';
import { CreateJobVacancyDto } from './dto/create-job-vacancy.dto';
import { UpdateJobVacancyDto } from './dto/update-job-vacancy.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('job-vacancies')
export class JobVacanciesController {
    constructor(private readonly service: JobVacanciesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new job vacancy', description: 'Creates a new job vacancy with the provided details.' })
    create(@Body() dto: CreateJobVacancyDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all job vacancies with optional title filtering', description: 'Fetches all job vacancies, with an optional filter for title keyword.' })
    @ApiQuery({
        name: 'title',
        required: false,
        type: String,
        description: 'Filter job vacancies by title keyword'
    })
    findAll(@Query('title') title?: string) {
        return this.service.findAll({ title });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific job vacancy by ID', description: 'Fetches the details of a specific job vacancy using its ID.' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific job vacancy by ID', description: 'Updates the details of a specific job vacancy using its ID.' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJobVacancyDto) {
        return this.service.update(id, dto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific job vacancy by ID', description: 'Deletes a specific job vacancy using its ID.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id)
    }
}
