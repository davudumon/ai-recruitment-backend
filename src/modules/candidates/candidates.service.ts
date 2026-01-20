import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateRepository } from './candidates.repository';
import { CreateCandidateDto } from './dto/create-candidates.dto';
import { AiService } from '../../common/services/ai.services';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../common/services/supabase.service';
import * as ExcelJS from 'exceljs';
import * as express from 'express';

@Injectable()
export class CandidatesService {
    constructor(
        private readonly candidateRepo: CandidateRepository,
        private readonly aiService: AiService,
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService,
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

        const filePath = await this.supabaseService.uploadFile(file);

        const ai = await this.aiService.analyzeCv(file.buffer, jobRequirementText);

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

    async findAll(filters: { jobId?: number; minScore?: number; skill?: string }) {
        return this.candidateRepo.findAll(filters);
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

        if (candidate.cvUrl) {
            await this.supabaseService.deleteFile(candidate.cvUrl);
        }

        return this.candidateRepo.delete(id);
    }

    async exportToExcel(res: express.Response, filters: any) {
        const candidates = await this.candidateRepo.findAll(filters);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Candidates');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 5 },
            { header: 'Full Name', key: 'fullName', width: 30 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Applied Position', key: 'jobTitle', width: 20 },
            { header: 'Skills', key: 'skills', width: 50 },
            { header: 'Years of Experience', key: 'yearsOfExperience', width: 20 },
            { header: 'Match Score', key: 'matchScore', width: 15 },
        ];

        candidates.forEach((candidate, index) => {
            worksheet.addRow({
                no: index + 1,
                fullName: candidate.fullName,
                email: candidate.email,
                jobTitle: candidate.job.title,
                skills: Array.isArray(candidate.skills)
                    ? candidate.skills.join(', ')
                    : (candidate.skills ?? '-'),
                yearsOfExperience: candidate.yearsOfExperience,
                matchScore: candidate.matchScore,
            });
        });

        const currentTime = Date.now();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=candidates-export-${currentTime}.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
    }
}
