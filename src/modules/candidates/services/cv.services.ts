import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import path from "path";

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
}