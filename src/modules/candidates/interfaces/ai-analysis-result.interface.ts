export interface AiAnalysisResult {
  fullName?: string;
  email?: string;
  skills: string[];
  experienceSummary?: string;
  yearsOfExperience?: number;
  summary: string;
  matchScore: number;
  reasoning: string;
}
