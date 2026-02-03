/**
 * Example: File Upload with Progress Tracking
 * Demonstrates file upload with validation and progress
 */

import React, { useState } from 'react';
import { useFileUpload, useMultipleFileUpload } from '../api/queries';
import { formatFileSize } from '../utils/dataHelpers';

/**
 * Single File Upload Example
 */
export const SingleFileUploadExample: React.FC = () => {
  const { upload, progress, isPending, isSuccess, error } = useFileUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const response = await upload(selectedFile);
      alert(`File uploaded successfully!\nURL: ${response.url}`);
      setSelectedFile(null);
    } catch (err) {
      alert(`Upload failed: ${(err as Error).message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Single File Upload</h2>

      {/* File input */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileSelect}
          accept="image/*,application/pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={isPending}
        />
      </div>

      {/* Selected file info */}
      {selectedFile && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium">{selectedFile.name}</div>
          <div className="text-xs text-gray-600 mt-1">
            {formatFileSize(selectedFile.size)} • {selectedFile.type}
          </div>
        </div>
      )}

      {/* Progress bar */}
      {isPending && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Uploading...</span>
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success message */}
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          Upload completed successfully!
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error.message}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};

/**
 * Multiple File Upload Example
 */
export const MultipleFileUploadExample: React.FC = () => {
  const { upload, progressMap, isPending, isSuccess } = useMultipleFileUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      const responses = await upload(selectedFiles);
      alert(`Successfully uploaded ${responses.length} files!`);
      setSelectedFiles([]);
    } catch (err) {
      alert(`Upload failed: ${(err as Error).message}`);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Multiple File Upload</h2>

      {/* File input */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFilesSelect}
          accept="image/*,application/pdf"
          multiple
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={isPending}
        />
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="mb-4 space-y-2">
          {selectedFiles.map((file, index) => {
            const fileProgress = progressMap.find((p) => p.fileIndex === index);

            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-gray-600">
                      {formatFileSize(file.size)} • {file.type}
                    </div>
                  </div>
                  {!isPending && (
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Progress bar for this file */}
                {fileProgress && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Uploading...</span>
                      <span className="text-xs font-medium">{fileProgress.progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${fileProgress.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Success message */}
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          All files uploaded successfully!
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Uploading...' : `Upload ${selectedFiles.length} File(s)`}
      </button>
    </div>
  );
};
