import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_KEY!,
        );
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const bucket = 'cv';
        const fileName = `${Date.now()}-${file.originalname}`;

        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });

        if (error) throw new Error(`Upload failed: ${error.message}`);

        const { data: publicUrlData } = this.supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    }
}