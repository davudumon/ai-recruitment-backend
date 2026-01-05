import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository) { }

    async create(dto: CreateUserDto) {
        const exist = await this.userRepo.findByEmail(dto.email);
        if (exist) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.userRepo.create({
            email: dto.email,
            name: dto.name,
            password: hashedPassword,
        });
    }

    async findAll() {
        return this.userRepo.findAll();
    }
}
