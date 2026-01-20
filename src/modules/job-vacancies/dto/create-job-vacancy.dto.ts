import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobVacancyDto {

    @ApiProperty({
        example: 'Senior Backend Developer',
        description: 'Title of the job position'
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'Responsible for developing and maintaining backend services.',
        description: 'Dull description of the job vacancy'
    })
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    location: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({
        example: ['Node.js', 'PostgreSQL', 'TypeScript'],
        description: 'Skills that must be possessed for this job',
        type: [String]
    })
    @IsArray()
    @IsString({ each: true })
    required_skills: string[];
}
