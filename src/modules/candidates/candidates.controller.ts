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
    Res,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { application } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import * as express from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService: CandidatesService) { }

    @Post()
    @ApiOperation({
        summary: 'Upload and analyze a candidate CV',
        description: 'Uploads a candidate CV in PDF format, analyzes it using AI (Gemini Model) against the specified job requirements, and stores the candidate data along with the analysis results.'
    })
    @ApiConsumes('multipart/form-data')
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
    @ApiOperation({ summary: 'Retrieve all candidates with optional filtering', description: 'Fetches all candidates, with optional filters for job ID, minimum match score, and specific skills.' })
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

    @Get('export')
    @ApiOperation({ summary: 'Export candidates to Excel', description: 'Exports the list of candidates to an Excel file, with optional filters for job ID, minimum match score, and specific skills.' })
    @ApiQuery({ name: 'jobId', required: false })
    @ApiQuery({ name: 'minScore', required: false })
    @ApiQuery({ name: 'skill', required: false })
    async export(
        @Query('jobId') jobId: number,
        @Query('minScore') minScore: number,
        @Query('skill') skill: string,
        @Res() res: express.Response
    ) {
        return this.candidatesService.exportToExcel(res, { jobId, minScore, skill });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific candidate by ID', description: 'Fetches the details of a specific candidate using their ID.' })
    async findOne(@Param('id') id: string) {
        const data = await this.candidatesService.findOne(Number(id));

        return {
            success: true,
            message: 'Candidate fetched successfully',
            data,
        };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific candidate by ID', description: 'Deletes a specific candidate using their ID.' })
    async remove(@Param('id') id: string) {
        await this.candidatesService.remove(Number(id));

        return {
            success: true,
            message: 'Candidate deleted successfully',
        };
    }
}
