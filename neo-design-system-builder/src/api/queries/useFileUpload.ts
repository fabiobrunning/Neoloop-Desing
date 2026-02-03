/**
 * React Query Hook: File Upload
 * Manages file upload operations with progress tracking
 */

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FileUploadResponse } from '../../schemas/file.schema';
import { uploadFile, uploadFiles, deleteFile, validateFile } from '../mock/files';
import { useState, useCallback } from 'react';

/**
 * Upload progress state
 */
export interface UploadProgress {
  fileIndex: number;
  progress: number;
  fileName: string;
}

/**
 * Hook to upload single file
 */
export const useFileUpload = () => {
  const [progress, setProgress] = useState<number>(0);

  const mutation = useMutation<FileUploadResponse, Error, File>({
    mutationFn: (file: File) => {
      setProgress(0);
      return uploadFile(file, (p) => setProgress(p));
    },
    onSuccess: () => {
      setProgress(100);
    },
    onError: () => {
      setProgress(0);
    },
  });

  const uploadWithValidation = useCallback(
    async (file: File) => {
      const validation = validateFile(file);

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      return mutation.mutateAsync(file);
    },
    [mutation]
  );

  return {
    ...mutation,
    progress,
    upload: uploadWithValidation,
  };
};

/**
 * Hook to upload multiple files
 */
export const useMultipleFileUpload = () => {
  const [progressMap, setProgressMap] = useState<Record<number, UploadProgress>>({});

  const mutation = useMutation<FileUploadResponse[], Error, File[]>({
    mutationFn: (files: File[]) => {
      setProgressMap({});

      return uploadFiles(files, (fileIndex, progress) => {
        setProgressMap((prev) => ({
          ...prev,
          [fileIndex]: {
            fileIndex,
            progress,
            fileName: files[fileIndex].name,
          },
        }));
      });
    },
    onSuccess: () => {
      // Mark all as 100%
      setProgressMap((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          updated[Number(key)].progress = 100;
        });
        return updated;
      });
    },
    onError: () => {
      setProgressMap({});
    },
  });

  const uploadWithValidation = useCallback(
    async (files: File[]) => {
      // Validate all files
      for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
          throw new Error(`${file.name}: ${validation.error}`);
        }
      }

      return mutation.mutateAsync(files);
    },
    [mutation]
  );

  return {
    ...mutation,
    progressMap: Object.values(progressMap),
    upload: uploadWithValidation,
  };
};

/**
 * Hook to delete file
 */
export const useDeleteFile = (): UseMutationResult<void, Error, string> => {
  return useMutation({
    mutationFn: (fileId: string) => deleteFile(fileId),
  });
};

/**
 * Hook to validate file before upload
 */
export const useFileValidation = () => {
  return useCallback((file: File, maxSize?: number) => {
    return validateFile(file, maxSize);
  }, []);
};
