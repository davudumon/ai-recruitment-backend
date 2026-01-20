import { ApiProperty } from "@nestjs/swagger";

export class CreateCandidateDto {
    @ApiProperty({
        example: '1',
        description: 'ID of the job vacancy the candidate is applying for'
    })
    jobId: string

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Resume file of the candidate (Max 2MB) in PDF format'
    })
    resumeFile: any;
}