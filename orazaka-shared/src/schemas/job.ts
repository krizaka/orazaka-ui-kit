import { z } from "zod";

/**
 * An async job as the job service returns it (`JobDto`): what ran, for whom, how it ended and when. One contract for
 * every client that lists jobs — the user's queue and the operators' supervision read the same shape.
 */
export const JobStatusSchema = z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const JobSchema = z.object({
  id: z.string(),
  userId: z.string(),
  featureKey: z.string(),
  status: JobStatusSchema,
  payload: z.record(z.string(), z.unknown()).catch({}),
  result: z.record(z.string(), z.unknown()).nullable().catch(null).transform((r) => r ?? {}),
  errorMessage: z.string().nullish(),
  progress: z.number().nullish(),
  /** ISO-8601. */
  createdAt: z.string(),
  /** ISO-8601: for a finished job, when it finished. */
  updatedAt: z.string(),
});
export type JobRecord = z.infer<typeof JobSchema>;

/** One page of jobs (Spring `Page`): the rows and the totals. */
export const JobPageSchema = z.object({
  content: z.array(JobSchema).default([]),
  totalPages: z.number().int().nonnegative().default(0),
  totalElements: z.number().int().nonnegative().default(0),
});
export type JobPage = z.infer<typeof JobPageSchema>;
