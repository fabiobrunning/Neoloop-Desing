import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, File, FileText, FileImage, FileVideo, FileAudio, CheckCircle2, AlertCircle } from 'lucide-react'

/**
 * Upload file info
 */
export interface UploadFile {
  /** Unique file ID */
  id: string
  /** File object */
  file: File
  /** Upload progress (0-100) */
  progress: number
  /** Upload status */
  status: 'pending' | 'uploading' | 'success' | 'error'
  /** Error message */
  error?: string
}

/**
 * File upload props
 */
export interface FileUploadProps {
  /** Upload handler */
  onUpload?: (files: File[]) => Promise<void>
  /** File change handler */
  onChange?: (files: UploadFile[]) => void
  /** Accepted file types */
  accept?: string
  /** Enable multiple file selection */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Show file list */
  showList?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Custom className */
  className?: string
}

/**
 * FileUpload Component
 *
 * Drag & drop file upload with progress tracking and validation.
 *
 * @example
 * ```tsx
 * // Basic file upload
 * <FileUpload
 *   onUpload={async (files) => {
 *     await uploadToServer(files)
 *   }}
 *   accept="image/*"
 *   multiple
 * />
 *
 * // With file size limit
 * <FileUpload
 *   onUpload={handleUpload}
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   maxFiles={3}
 * />
 * ```
 */
export function FileUpload({
  onUpload,
  onChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  showList = true,
  disabled = false,
  className = '',
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim())
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const category = type.split('/')[0]
          return file.type.startsWith(category + '/')
        }
        return file.type === type || file.name.endsWith(type.replace('*', ''))
      })

      if (!isAccepted) {
        return 'File type not accepted'
      }
    }

    return null
  }

  const handleFiles = useCallback(async (fileList: FileList) => {
    const newFiles: UploadFile[] = []
    const filesToUpload: File[] = []

    Array.from(fileList).forEach(file => {
      if (maxFiles && files.length + newFiles.length >= maxFiles) {
        return
      }

      const error = validateFile(file)
      const uploadFile: UploadFile = {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        progress: 0,
        status: error ? 'error' : 'pending',
        error,
      }

      newFiles.push(uploadFile)

      if (!error) {
        filesToUpload.push(file)
      }
    })

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onChange?.(updatedFiles)

    // Handle upload
    if (onUpload && filesToUpload.length > 0) {
      // Mark as uploading
      setFiles(prev =>
        prev.map(f =>
          filesToUpload.some(file => file.name === f.file.name)
            ? { ...f, status: 'uploading' as const }
            : f
        )
      )

      try {
        await onUpload(filesToUpload)

        // Mark as success
        setFiles(prev =>
          prev.map(f =>
            filesToUpload.some(file => file.name === f.file.name)
              ? { ...f, status: 'success' as const, progress: 100 }
              : f
          )
        )
      } catch (error) {
        // Mark as error
        setFiles(prev =>
          prev.map(f =>
            filesToUpload.some(file => file.name === f.file.name)
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          )
        )
      }
    }
  }, [files, maxFiles, onUpload, onChange, accept, maxSize])

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled) return

    const { files: droppedFiles } = e.dataTransfer
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: selectedFiles } = e.target
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
  }

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId)
    setFiles(updatedFiles)
    onChange?.(updatedFiles)
  }

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  return (
    <div className={className}>
      {/* Drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className="text-sm font-medium text-gray-900 mb-1">
          {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-gray-500">
          {accept ? `Accepted: ${accept}` : 'Any file type'}
          {maxSize && ` • Max ${formatFileSize(maxSize)}`}
          {maxFiles && ` • Max ${maxFiles} files`}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* File list */}
      {showList && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(uploadFile => (
            <FileItem
              key={uploadFile.id}
              file={uploadFile}
              onRemove={() => handleRemoveFile(uploadFile.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

FileUpload.displayName = 'FileUpload'

/**
 * File item component
 */
interface FileItemProps {
  file: UploadFile
  onRemove: () => void
}

function FileItem({ file, onRemove }: FileItemProps) {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="h-5 w-5 text-blue-600" />
    if (type.startsWith('video/')) return <FileVideo className="h-5 w-5 text-purple-600" />
    if (type.startsWith('audio/')) return <FileAudio className="h-5 w-5 text-green-600" />
    if (type.startsWith('text/')) return <FileText className="h-5 w-5 text-gray-600" />
    return <File className="h-5 w-5 text-gray-600" />
  }

  const getStatusIcon = () => {
    if (file.status === 'success') return <CheckCircle2 className="h-5 w-5 text-green-600" />
    if (file.status === 'error') return <AlertCircle className="h-5 w-5 text-red-600" />
    return null
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
      {getFileIcon(file.file.type)}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
          {getStatusIcon()}
        </div>
        <p className="text-xs text-gray-500">
          {formatFileSize(file.file.size)}
          {file.error && ` • ${file.error}`}
        </p>

        {file.status === 'uploading' && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 p-1 rounded hover:bg-gray-100 transition-colors"
        aria-label="Remove file"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}

/**
 * Format file size
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
