import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getSummary() {
        const totalJobs = await this.prisma.job.count();

        const totalCandidates = await this.prisma.candidate.count();

        const newestCandidates = await this.prisma.candidate.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
            select: {
                id: true,
                fullName: true,
                createdAt: true,
                job: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return {
            totalJobs,
            totalCandidates,
            newestCandidates,
        };
    }
}
