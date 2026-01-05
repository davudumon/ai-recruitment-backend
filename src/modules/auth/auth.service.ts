import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ) { }

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong Password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}
