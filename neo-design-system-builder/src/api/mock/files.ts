/**
 * Mock File Upload API
 * Simulates file upload with progress tracking
 */

import { FileUpload, FileUploadResponse, FileUploadResponseSchema } from '../../schemas/file.schema';
import { delay } from './delay';
import { maybeThrowError, validationError } from './errors';
import { v4 as uuidv4 } from 'uuid';

/**
 * Simulate file upload with progress
 */
export const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse> => {
  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    throw validationError('file', 'File size exceeds 10MB limit');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    throw validationError('file', 'File type not supported');
  }

  // Simulate upload progress
  const totalSteps = 10;
  for (let i = 0; i <= totalSteps; i++) {
    const progress = (i / totalSteps) * 100;
    onProgress?.(progress);

    // Random delay for each chunk
    await delay({ min: 100, max: 200 });

    // Small chance of error during upload
    if (i < totalSteps) {
      maybeThrowError(0.02);
    }
  }

  // Generate mock response
  const response: FileUploadResponse = {
    id: uuidv4(),
    url: `https://storage.example.com/uploads/${uuidv4()}-${file.name}`,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
  };

  return FileUploadResponseSchema.parse(response);
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (
  files: File[],
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<FileUploadResponse[]> => {
  const results: FileUploadResponse[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const result = await uploadFile(file, (progress) => {
      onProgress?.(i, progress);
    });

    results.push(result);
  }

  return results;
};

/**
 * Delete uploaded file
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  await delay({ min: 200, max: 400 });
  maybeThrowError(0.05);

  // Simulate deletion
  console.log(`Deleted file: ${fileId}`);
};

/**
 * Get file metadata
 */
export const getFileMetadata = async (fileId: string): Promise<FileUploadResponse> => {
  await delay({ min: 100, max: 200 });
  maybeThrowError(0.05);

  // Mock response
  const response: FileUploadResponse = {
    id: fileId,
    url: `https://storage.example.com/uploads/${fileId}`,
    name: 'example-file.png',
    size: 1024 * 512, // 512KB
    type: 'image/png',
    uploadedAt: new Date().toISOString(),
  };

  return FileUploadResponseSchema.parse(response);
};

/**
 * Validate file before upload
 */
export const validateFile = (file: File, maxSize: number = 10 * 1024 * 1024): { valid: boolean; error?: string } => {
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`,
    };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not supported. Allowed types: JPEG, PNG, GIF, WebP, PDF',
    };
  }

  return { valid: true };
};
