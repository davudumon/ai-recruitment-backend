import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    @ApiOperation({ summary: 'Get dashboard summary data', description: 'Retrieves summary data for the dashboard including total jobs, total candidates, and newest candidates.' })
    async getSummary() {
        const data = await this.dashboardService.getSummary();

        return {
            success: true,
            message: 'Dashboard summary data retrieved successfully',
            data,
        };
    }
}
