import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'admin@example.com',
        description: 'Email address of the user'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Admin User',
        description: 'Name of the user'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'Password for the user account'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
