import { z } from 'zod';

/**
 * File Upload Validation Schemas
 * Defines validation rules for file upload operations
 */

export const FileUploadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  size: z.number().int().min(0).max(10 * 1024 * 1024), // 10MB max
  type: z.string().regex(/^[a-z]+\/[a-z0-9\-\+\.]+$/i), // MIME type
  lastModified: z.number().int().min(0),
  status: z.enum(['pending', 'uploading', 'success', 'error']),
  progress: z.number().min(0).max(100).optional(),
  url: z.string().url().optional(),
  error: z.string().optional(),
});

export const FileUploadConfigSchema = z.object({
  maxSize: z.number().int().min(0).default(10 * 1024 * 1024),
  maxFiles: z.number().int().min(1).max(10).default(5),
  acceptedTypes: z.array(z.string()).default(['image/*', 'application/pdf']),
  multiple: z.boolean().default(false),
});

export const FileUploadResponseSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  name: z.string(),
  size: z.number().int().min(0),
  type: z.string(),
  uploadedAt: z.string().datetime(),
});

// Type exports
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type FileUploadConfig = z.infer<typeof FileUploadConfigSchema>;
export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
