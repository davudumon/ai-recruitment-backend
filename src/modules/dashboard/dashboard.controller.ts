import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    async getSummary() {
        const data = await this.dashboardService.getSummary();

        return {
            success: true,
            message: 'Dashboard summary data retrieved successfully',
            data,
        };
    }
}
