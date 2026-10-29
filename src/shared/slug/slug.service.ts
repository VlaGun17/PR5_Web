import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {
    generateSlug(title: string): string{
        return title
        .toLowerCase()
        .trim()
        .replace(/[\s\W_]+-/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
    }
}
