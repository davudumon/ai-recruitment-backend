import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiAnalysisResult } from '../../modules/candidates/interfaces/ai-analysis-result.interface';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

@Injectable()
export class AiService {
    private readonly ai: GoogleGenAI;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY!;
        this.ai = new GoogleGenAI({ apiKey: apiKey });
    }

    async analyzeCv(fileBuffer: Buffer, jobRequirement: string): Promise<AiAnalysisResult> {
        try {

            const contents = [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `
                            You are an expert AI Recruitment Assistant.
                            
                            JOB REQUIREMENT:
                            """
                            ${jobRequirement}
                            """

                            TASK:
                            1. Analyze the attached CV.
                            2. Compare the candidate's skills and experience against the JOB REQUIREMENT.
                            3. Calculate a "matchScore" (0-100) based on their suitability for this specific job.
                            4. Extract information and return ONLY valid JSON.

                            JSON format:
                            {
                              "fullName": string | null,
                              "email": string | null,
                              "skills": string[],
                              "experienceSummary": string | null,
                              "yearsOfExperience": number | null,
                              "summary": string,
                              "matchScore": number,
                              "reasoning": string
                            }   
                            `,
                        },
                        {
                            inlineData: {
                                mimeType: 'application/pdf',
                                data: fileBuffer.toString("base64") // Convert ke Base64
                            }
                        }
                    ],
                },
            ];

            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: contents,
            });

            const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error('Empty AI Response');
            }

            const cleanJson = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleanJson) as AiAnalysisResult;

        } catch (error) {
            console.error('AI Analysis Error:', error);
            throw new InternalServerErrorException(
                'Failed to analyze CV: ' + (error.message || 'Unknown error'),
            );
        }
    }
}