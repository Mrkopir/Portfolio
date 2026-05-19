import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir, stat } from 'fs/promises';
import { basename, extname, join } from 'path';

type ImageItem = {
  filename: string;
  url: string;
};

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

@Injectable()
export class ImagesService {
  private readonly imageDir = join(process.cwd(), 'public/img');

  constructor(private readonly configService: ConfigService) {}

  async getImages(): Promise<ImageItem[]> {
    let filenames: string[];

    try {
      filenames = await readdir(this.imageDir);
    } catch {
      return [];
    }

    const serverUrl = this.configService
      .get<string>('SERVER_URL', 'http://localhost:5000')
      .replace(/\/$/, '');
    const images = await Promise.all(
      filenames.map(async (filename) => {
        if (filename !== basename(filename)) {
          return null;
        }

        const extension = extname(filename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.has(extension)) {
          return null;
        }

        const filePath = join(this.imageDir, filename);
        const fileStat = await stat(filePath);

        if (!fileStat.isFile()) {
          return null;
        }

        return {
          filename,
          url: `${serverUrl}/static/img/${encodeURIComponent(filename)}`,
        };
      }),
    );

    return images
      .filter((image): image is ImageItem => image !== null)
      .sort((a, b) => a.filename.localeCompare(b.filename));
  }
}
