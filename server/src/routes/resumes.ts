import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const resumeSchema = z.object({
    id: z.number().int().min(1).positive(),
    title: z.string().min(3).max(100),
    htmlString: z.string()
});

const createPostSchema = resumeSchema.omit({ id: true });

type Resume = z.infer<typeof resumeSchema>;

export const resumesRoute = new Hono()
    .get("/all/:userId", (c) => {
        const userId = c.req.param("userId")
        // find userId in DB
        // if (!user) return c.notFound();

        return c.json({ resumes: [userId] });
    });