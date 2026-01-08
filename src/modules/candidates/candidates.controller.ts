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
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService: CandidatesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() dto: CreateCandidateDto, @UploadedFile() file: Express.Multer.File) {
        const data = await this.candidatesService.create(dto, file);

        return {
            success: true,
            message: 'Candidate CV uploaded and analyzed successfully',
            data,
        };
    }

    @Get()
    async findAll() {
        const data = await this.candidatesService.findAll();

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
