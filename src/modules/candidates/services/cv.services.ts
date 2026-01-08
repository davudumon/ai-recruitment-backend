import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import path from "path";
import { PDFParse } from "pdf-parse";

@Injectable()
export class cvService {
    async uploadCv(file: Express.Multer.File): Promise<string> {
        const uploadDir = path.join(process.cwd(), 'uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);
        fs.writeFileSync(filePath, file.buffer);

        return filePath
    }

    async extractTextFromPdf(filePath: string): Promise<string> {
        const parser = new PDFParse({ url: filePath })
        const result = await parser.getText()

        return result.text
    }
}