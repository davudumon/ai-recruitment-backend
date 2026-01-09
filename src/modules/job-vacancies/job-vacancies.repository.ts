import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobVacancyRepository {
    constructor(private prisma: PrismaService) { }

    create(data: Prisma.JobCreateInput) {
        return this.prisma.job.create({ data });
    }

    findAll(filters: { title?: string } = {}) {
        const { title } = filters;

        return this.prisma.job.findMany({
            where: {
                title: title
                    ? {
                        contains: title
                    }
                    : undefined,
            },
            include: {
                _count: {
                    select: {
                        candidates: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    findById(id: number) {
        return this.prisma.job.findUnique({
            where: { id },
        });
    }

    update(id: number, data: Prisma.JobUpdateInput) {
        return this.prisma.job.update({
            where: { id },
            data,
        });
    }

    delete(id: number) {
        return this.prisma.job.delete({
            where: { id },
        });
    }
}
