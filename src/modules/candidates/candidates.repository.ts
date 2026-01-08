import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CandidateRepository {
    constructor(private prisma: PrismaService) { }

    create(data: Prisma.CandidateCreateInput) {
        return this.prisma.candidate.create({ data });
    }

    findAll() {
        return this.prisma.candidate.findMany({
            include: {
                job: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    findById(id: number) {
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