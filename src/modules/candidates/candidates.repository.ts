import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CandidateRepository {
    constructor(private prisma: PrismaService) { }

    create(data: Prisma.CandidateCreateInput) {
        return this.prisma.candidate.create({ data });
    }

    async findAll(filters: { jobId?: number; minScore?: number; skill?: string }) {
        return this.prisma.candidate.findMany({
            where: {
                ...(filters.jobId && { jobId: Number(filters.jobId) }),

                ...(filters.minScore && {
                    matchScore: { gte: Number(filters.minScore) }
                }),

                ...(filters.skill && {
                    skills: {
                        array_contains: filters.skill
                    }
                }),
            },
            orderBy: {
                matchScore: 'desc',
            },
            include: {
                job: true
            }
        });
    }

    findById(id: number) {
        if (isNaN(id)) return null;

        return this.prisma.candidate.findUnique({
            where: { id },
            include: {
                job: true
            }
        })
    }

    findByJob(jobId: number) {
        return this.prisma.candidate.findMany({
            where: { jobId },
            orderBy: { matchScore: 'desc' }
        })
    }

    update(id: number, data: Prisma.CandidateUpdateInput) {
        return this.prisma.candidate.update({
            where: { id },
            data: data
        })
    }

    delete(id: number) {
        return this.prisma.candidate.delete({
            where: { id }
        })
    }
}