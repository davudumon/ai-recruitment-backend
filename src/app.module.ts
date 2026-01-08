import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { JobVacanciesModule } from './modules/job-vacancies/job-vacancies.module';
import { CandidatesModule } from './modules/candidates/candidates.module';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, JobVacanciesModule, CandidatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
