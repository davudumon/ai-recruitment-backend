# AI Recruitment Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  An intelligent AI-powered recruitment system backend built with NestJS that automates candidate evaluation using Google Gemini AI.
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [License](#license)

---

## 🎯 Overview

AI Recruitment Backend is a comprehensive backend solution for managing job vacancies and candidate applications. It uses AI (Google Gemini) to analyze CVs, extract candidate information, and match candidates against job requirements with intelligent scoring and reasoning.

---

## ✨ Features

- **JWT-based Authentication**: Secure user authentication and authorization
- **AI-Powered CV Analysis**: Automatic parsing and analysis of PDF resumes using Google Gemini
- **Intelligent Candidate Matching**: Matches candidates against job requirements with match scores
- **Job Vacancy Management**: Create, update, and manage job postings
- **Candidate Database**: Store and retrieve candidate information with AI-generated summaries
- **Dashboard Analytics**: Overview of recruitment metrics and statistics
- **File Upload Support**: Handle PDF CV uploads with validation
- **Excel Export**: Export candidate and job data to Excel
- **API Documentation**: Integrated Swagger/OpenAPI documentation

---

## 🛠 Tech Stack

- **Framework**: NestJS 11.0.1
- **Runtime**: Node.js
- **Language**: TypeScript 5.7.3
- **Database**: MySQL (via Prisma ORM)
- **Authentication**: JWT with Passport.js
- **AI Integration**: Google Generative AI (Gemini)
- **File Storage**: Supabase
- **Testing**: Jest
- **API Documentation**: Swagger/OpenAPI
- **Code Quality**: ESLint, Prettier

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/                 # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── users/                # User management module
│   ├── candidates/           # Candidate management module
│   │   ├── candidates.controller.ts
│   │   ├── candidates.service.ts
│   │   ├── candidates.repository.ts
│   │   └── dto/
│   ├── job-vacancies/        # Job posting management module
│   │   ├── job-vacancies.controller.ts
│   │   ├── job-vacancies.service.ts
│   │   └── dto/
│   └── dashboard/            # Analytics & dashboard module
├── common/
│   ├── guards/               # JWT authentication guards
│   ├── interceptors/         # Response interceptors
│   └── services/             # Shared services (AI, Supabase)
├── prisma/                   # Database module & service
├── app.module.ts             # Root application module
├── app.controller.ts
├── app.service.ts
└── main.ts                   # Application entry point
prisma/
├── schema.prisma             # Database schema
└── migrations/               # Database migration history
```

---

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Google Cloud Account (for Gemini API)
- Supabase Account (for file storage)

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-recruitment-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npm run postinstall
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/recruitment_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"

# Google Gemini API
GOOGLE_API_KEY="your-google-gemini-api-key"

# Supabase
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-key"
SUPABASE_BUCKET="your-storage-bucket-name"

# Application
PORT=3000
NODE_ENV=development
```

### 2. Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

---

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

### Watch Mode

```bash
npm run start:dev
```

### Debug Mode

```bash
npm run start:debug
```

### Production Mode

```bash
npm run build
npm run start:prod
```

---

## 🧪 Testing

### Run all tests

```bash
npm test
```

### Watch mode

```bash
npm run test:watch
```

### Coverage report

```bash
npm run test:cov
```

### E2E tests

```bash
npm run test:e2e
```

---

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login and JWT token generation

### Candidates
- `POST /candidates` - Upload and analyze candidate CV
- `GET /candidates` - Get all candidates
- `GET /candidates/:id` - Get candidate details
- `DELETE /candidates/:id` - Delete candidate

### Job Vacancies
- `POST /job-vacancies` - Create job posting
- `GET /job-vacancies` - Get all job vacancies
- `GET /job-vacancies/:id` - Get job vacancy details
- `PUT /job-vacancies/:id` - Update job vacancy
- `DELETE /job-vacancies/:id` - Delete job vacancy

### Dashboard
- `GET /dashboard` - Get recruitment analytics and statistics

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

For detailed API documentation, visit `/api` after starting the application.

---

## 💾 Database Schema

### User Model
- Stores user authentication credentials
- Fields: id, name, email, password, createdAt, updatedAt

### Job Model
- Manages job vacancies
- Fields: id, title, description, location, isActive, required_skills, createdAt, updatedAt

### Candidate Model
- Stores candidate information and AI analysis results
- Fields: id, fullName, email, skills, experienceSummary, yearsOfExperience, cvUrl, rawCvText, aiSummary, matchScore, aiReasoning, jobId, createdAt

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User logs in via `/auth/login` endpoint
2. Receives a JWT token in response
3. Includes token in `Authorization: Bearer <token>` header for protected routes
4. Token is validated using JWT strategy

Protected endpoints require the `@UseGuards(JwtAuthGuard)` decorator.

---

## 📦 Available Scripts

```bash
npm run build        # Build the project for production
npm run format       # Format code with Prettier
npm start            # Start the application
npm run start:dev    # Start with file watching
npm run start:debug  # Start with debugging enabled
npm run start:prod   # Run production build
npm run lint         # Run ESLint and fix issues
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Generate coverage report
npm run test:e2e     # Run end-to-end tests
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add some feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Create a Pull Request

---

## 📄 License

This project is [MIT Licensed](LICENSE).

---

## ✉️ Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Built with ❤️ using NestJS and Gemini AI**
