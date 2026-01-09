import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Body,
    UseGuards,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Query,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { application } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService: CandidatesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() dto: CreateCandidateDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }), // Maximal CV File Size: 2MB
                new FileTypeValidator({ fileType: 'application/pdf' })
            ],
        })
    ) file: Express.Multer.File
    ) {
        const data = await this.candidatesService.create(dto, file);

        return {
            success: true,
            message: 'Candidate CV uploaded and analyzed successfully',
            data,
        };
    }

    @Get()
    @ApiQuery({ name: 'jobId', required: false, description: 'Filter pelamar berdasarkan ID Lowongan' })
    @ApiQuery({ name: 'skill', required: false, description: 'Filter pelamar berdasarkan keterampilan' })
    @ApiQuery({ name: 'minScore', required: false, description: 'Filter pelamar berdasarkan skor minimum' })

    async findAll(
        @Query('jobId') jobId?: number,
        @Query('minScore') minScore?: number,
        @Query('skill') skill?: string
    ) {
        const data = await this.candidatesService.findAll({ jobId, minScore, skill });

        return {
            success: true,
            message: 'Candidates fetched successfully',
            data,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.candidatesService.findOne(Number(id));

        return {
            success: true,
            message: 'Candidate fetched successfully',
            data,
        };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.candidatesService.remove(Number(id));

        return {
            success: true,
            message: 'Candidate deleted successfully',
        };
    }
}
