import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateRepository } from './candidates.repository';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { cvService } from './services/cv.services';
import { AiService } from './services/ai.services';
import { raw } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesService {
    constructor(
        private readonly candidateRepo: CandidateRepository,
        private readonly cvService: cvService,
        private readonly aiService: AiService,
        private readonly prisma: PrismaService
    ) { }

    async create(dto: CreateCandidateDto, file: Express.Multer.File) {

        const job = await this.prisma.job.findUnique({
            where: { id: Number(dto.jobId) }
        });

        if (!job) throw new NotFoundException('Job not found');

        const jobRequirementText = `
        Job Title: ${job.title}
        Description: ${job.description}
        Must Have Skills: ${JSON.stringify(job.required_skills)}
        `;

        const filePath = await this.cvService.uploadCv(file);

        const ai = await this.aiService.analyzeCv(filePath, jobRequirementText);

        return this.candidateRepo.create({
            fullName: ai.fullName,
            email: ai.email,
            skills: ai.skills,
            experienceSummary: ai.experienceSummary,
            yearsOfExperience: ai.yearsOfExperience,
            aiSummary: ai.summary,
            matchScore: ai.matchScore,
            aiReasoning: ai.reasoning,
            cvUrl: filePath,
            job: {
                connect: { id: Number(dto.jobId) }
            }
        });
    }

    async findAll() {
        return this.candidateRepo.findAll();
    }

    async findOne(id: number) {
        const candidate = await this.candidateRepo.findById(id);

        if (!candidate) {
            throw new NotFoundException('Candidate not found');
        }

        return candidate;
    }

    async remove(id: number) {
        const candidate = await this.candidateRepo.findById(id);

        if (!candidate) {
            throw new NotFoundException('Candidate not found');
        }

        return this.candidateRepo.delete(id);
    }
}
