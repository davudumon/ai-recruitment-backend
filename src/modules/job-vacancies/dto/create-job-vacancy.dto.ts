import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobVacancyDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    location: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsArray()
    @IsString({ each: true })
    required_skills: string[];
}
