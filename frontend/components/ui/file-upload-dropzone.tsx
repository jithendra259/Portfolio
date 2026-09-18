'use client';

import React, { useState, useRef } from 'react';
import { toast } from 'sonner';

export interface UploadedFileMeta {
  id: string;
  filename: string;
  content: string;
  contentType: string;
  size: number;
}

interface UploadingFileItem {
  id: string;
  filename: string;
  size: number;
  progress: number;
}

export interface FileUploadDropzoneProps {
  attachedFiles: UploadedFileMeta[];
  onFilesChange: (files: UploadedFileMeta[]) => void;
  maxFileSizeMb?: number;
  maxTotalSizeMb?: number;
  className?: string;
}

export const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  attachedFiles,
  onFilesChange,
  maxFileSizeMb = 10,
  maxTotalSizeMb = 25,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeReaders = useRef<Map<string, FileReader>>(new Map());

  const processSingleFile = (file: File) => {
    if (file.size > maxFileSizeMb * 1024 * 1024) {
      toast.error(`"${file.name}" exceeds the ${maxFileSizeMb}MB limit.`);
      return;
    }

    // Check if already exists in attached files
    if (attachedFiles.some((f) => f.filename === file.name && f.size === file.size)) {
      toast.info(`"${file.name}" is already attached.`);
      return;
    }

    const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Add to uploading items with initial progress
    setUploadingFiles((prev) => [
      ...prev,
      { id: fileId, filename: file.name, size: file.size, progress: 12 },
    ]);

    // Progress animation simulation
    let currentProgress = 12;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 22) + 15;
      if (currentProgress >= 92) {
        currentProgress = 92;
        clearInterval(progressInterval);
      }
      setUploadingFiles((prev) =>
        prev.map((item) => (item.id === fileId ? { ...item, progress: currentProgress } : item))
      );
    }, 160);

    const reader = new FileReader();
    activeReaders.current.set(fileId, reader);

    reader.onload = () => {
      // Allow the progress animation to reach 100% smoothly
      clearInterval(progressInterval);
      setUploadingFiles((prev) =>
        prev.map((item) => (item.id === fileId ? { ...item, progress: 100 } : item))
      );

      setTimeout(() => {
        const resultStr = reader.result as string;
        const base64 = resultStr.split(',')[1] || '';

        const newMeta: UploadedFileMeta = {
          id: fileId,
          filename: file.name,
          content: base64,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
        };

        // Remove from uploading and add to attached files
        setUploadingFiles((prev) => prev.filter((item) => item.id !== fileId));
        activeReaders.current.delete(fileId);
        onFilesChange([...attachedFiles, newMeta]);
        toast.success(`Attached "${file.name}"`);
      }, 450);
    };

    reader.onerror = () => {
      clearInterval(progressInterval);
      setUploadingFiles((prev) => prev.filter((item) => item.id !== fileId));
      activeReaders.current.delete(fileId);
      toast.error(`Failed to read "${file.name}".`);
    };

    reader.readAsDataURL(file);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => processSingleFile(file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelUpload = (id: string) => {
    const reader = activeReaders.current.get(id);
    if (reader) {
      reader.abort();
      activeReaders.current.delete(id);
    }
    setUploadingFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFile = (id: string) => {
    onFilesChange(attachedFiles.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb >= 0.1) return `${mb.toFixed(2)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  const totalBytes = attachedFiles.reduce((acc, f) => acc + f.size, 0);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(1);
  const storagePercentage = Math.min(
    100,
    Math.round((totalBytes / (maxTotalSizeMb * 1024 * 1024)) * 100)
  );

  const hasItems = attachedFiles.length > 0 || uploadingFiles.length > 0;

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <style>{`
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .upload-shimmer-bar {
          animation: shimmerSlide 1.6s ease-in-out infinite;
        }
        .custom-file-upload-form {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-file-upload-label {
          cursor: pointer;
          background-color: rgba(24, 24, 27, 0.65);
          padding: 26px 36px;
          border-radius: 28px;
          border: 2px dashed rgb(82, 82, 82);
          box-shadow: 0px 10px 35px -10px rgba(0, 0, 0, 0.5);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        :root:not(.dark) .custom-file-upload-label {
          background-color: #f1f5f9;
          border-color: #94a3b8;
          box-shadow: 0px 10px 25px -10px rgba(0, 0, 0, 0.1);
        }
        .custom-file-upload-label:hover,
        .custom-file-upload-label.is-dragging {
          border-color: #38bdf8;
          background-color: rgba(30, 41, 59, 0.75);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -10px rgba(56, 189, 248, 0.2);
        }
        :root:not(.dark) .custom-file-upload-label:hover,
        :root:not(.dark) .custom-file-upload-label.is-dragging {
          background-color: #e2e8f0;
          border-color: #0284c7;
        }
        .custom-file-upload-design {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
        }
        .custom-file-upload-design svg {
          height: 48px;
          width: 48px;
          fill: rgb(113, 113, 122);
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }
        .custom-file-upload-label:hover svg,
        .custom-file-upload-label.is-dragging svg {
          fill: #38bdf8;
          transform: scale(1.08);
        }
        .custom-browse-button {
          background-color: rgb(82, 82, 82);
          padding: 6px 18px;
          border-radius: 10px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-top: 4px;
          display: inline-block;
        }
        .custom-file-upload-label:hover .custom-browse-button,
        .custom-file-upload-label.is-dragging .custom-browse-button {
          background-color: #0284c7;
          color: #ffffff;
        }
      `}</style>

      {/* HIDDEN MULTIPLE FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        id="appointment-multi-file-upload-input"
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      {/* DROPZONE UI (SNIPPET 2 DESIGN) */}
      <div className="custom-file-upload-form">
        <label
          htmlFor="appointment-multi-file-upload-input"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`custom-file-upload-label ${isDragging ? 'is-dragging' : ''}`}
        >
          <div className="custom-file-upload-design">
            <svg height="1em" viewBox="0 0 640 512">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
            <p className="text-sm font-medium text-foreground">
              {hasItems ? 'Drop more documents here or browse' : 'Drag and Drop'}
            </p>
            <p className="text-xs text-muted-foreground">or</p>
            <span className="custom-browse-button">
              {hasItems ? 'Add files' : 'Browse files'}
            </span>
          </div>
        </label>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Supported: PDF, DOC, DOCX, JPG, PNG (Max {maxFileSizeMb}MB per file)
      </p>

      {/* LIST OF UPLOADING AND ATTACHED DOCUMENTS (SNIPPET 1 FLOW) */}
      {hasItems && (
        <div className="space-y-3 pt-2">
          {/* UPLOADING STATE CARDS WITH SHIMMER PROGRESS EFFECT */}
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate">
                  <div className="rounded-lg bg-cyan-500/15 p-2 text-cyan-400 shrink-0">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-sm text-foreground truncate">{file.filename}</p>
                    <p className="text-xs text-slate-400">
                      {formatFileSize(file.size)} • Uploading...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-cyan-400">{file.progress}%</span>
                  <button
                    type="button"
                    onClick={() => cancelUpload(file.id)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                    title="Cancel upload"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PROGRESS BAR WITH REALISTIC SHIMMER ANIMATION */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800 relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-200"
                  style={{ width: `${file.progress}%` }}
                >
                  <div className="h-full w-full upload-shimmer-bar bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
              </div>
            </div>
          ))}

          {/* COMPLETED ATTACHED FILE CARDS */}
          {attachedFiles.map((file) => {
            const ext = file.filename.split('.').pop()?.toUpperCase() || 'FILE';
            return (
              <div
                key={file.id}
                className="rounded-xl border border-border bg-slate-900/60 p-4 shadow-md hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                      <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="truncate">
                      <p className="font-medium text-sm text-foreground truncate">{file.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {ext}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-medium">
                      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Complete</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* STORAGE USED & ACTION CONTROLS (FROM SNIPPET 1) */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-slate-900/50 p-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Attached
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">{totalMb} MB</span>
                <span className="text-xs text-muted-foreground">/ {maxTotalSizeMb} MB Limit ({attachedFiles.length} {attachedFiles.length === 1 ? 'file' : 'files'})</span>
              </div>
            </div>
            <div className="relative h-11 w-11 shrink-0">
              <svg className="h-11 w-11 -rotate-90 transform" viewBox="0 0 36 36">
                <circle
                  cx={18}
                  cy={18}
                  r={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  className="text-slate-800"
                />
                <circle
                  cx={18}
                  cy={18}
                  r={16}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeDasharray={100}
                  strokeDashoffset={100 - storagePercentage}
                  className="text-cyan-500 transition-all duration-500"
                />
              </svg>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-foreground">
                {storagePercentage}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadDropzone;
