import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        billboard: z.string().optional(),
        billboardSize: z.string().optional(),
        githubIssue: z.number().optional(),
        readingTime: z.string().optional(),
        tags: z.array(z.string()),
        headerStyle: z.string().optional(),
    }),
});

export const collections = { posts };
