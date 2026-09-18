'use client';

import React, { useState, useRef } from 'react';
import { toast } from 'sonner';

export interface UploadedFileMeta {
  filename: string;
  content: string;
  contentType: string;
  size: number;
}

export interface FileUploadDropzoneProps {
  attachedFile: UploadedFileMeta | null;
  isUploading: boolean;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  className?: string;
}

export const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  attachedFile,
  isUploading,
  onFileSelect,
  onFileRemove,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit.');
        return;
      }
      onFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size exceeds 10MB limit.');
        return;
      }
      onFileSelect(file);
    }
  };

  const fileExtension = attachedFile?.filename.split('.').pop()?.toUpperCase() || 'FILE';
  const fileSizeMb = attachedFile ? (attachedFile.size / (1024 * 1024)).toFixed(2) : '0';
  const fileSizeKb = attachedFile ? Math.round(attachedFile.size / 1024) : 0;
  const fileSizeLabel = Number(fileSizeMb) >= 0.1 ? `${fileSizeMb} MB` : `${fileSizeKb} KB`;

  return (
    <div className={`w-full ${className}`}>
      <style>{`
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

      <input
        ref={fileInputRef}
        type="file"
        id="appointment-file-upload-input"
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* STATE 1: UPLOADING / PROCESSING (FLOW CARD FROM SNIPPET 1) */}
      {isUploading && (
        <div className="rounded-xl border border-border bg-slate-900/70 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Reading file...</p>
                <p className="text-xs text-muted-foreground">Preparing document for meeting</p>
              </div>
            </div>
            <span className="text-sm font-medium text-cyan-400">84%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-500 to-sky-500">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: ATTACHED FILE COMPLETE (FLOW CARD FROM SNIPPET 1) */}
      {!isUploading && attachedFile && (
        <div className="rounded-xl border border-border bg-slate-900/70 p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 shrink-0">
                <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="truncate">
                <p className="font-medium text-sm text-foreground truncate">{attachedFile.filename}</p>
                <p className="text-xs text-muted-foreground">
                  {fileSizeLabel} • {fileExtension}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-emerald-500 text-xs sm:text-sm font-medium">
                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Complete</span>
              </div>
              <button
                type="button"
                onClick={onFileRemove}
                className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors cursor-pointer"
                title="Remove file"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs">
            <span className="text-muted-foreground">Attached to appointment booking</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Replace file
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: DROPZONE (UI DESIGN FROM SNIPPET 2) */}
      {!isUploading && !attachedFile && (
        <div className="custom-file-upload-form">
          <label
            htmlFor="appointment-file-upload-input"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`custom-file-upload-label ${isDragging ? 'is-dragging' : ''}`}
          >
            <div className="custom-file-upload-design">
              <svg height="1em" viewBox="0 0 640 512">
                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
              </svg>
              <p className="text-sm font-medium text-foreground">Drag and Drop</p>
              <p className="text-xs text-muted-foreground">or</p>
              <span className="custom-browse-button">Browse file</span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default FileUploadDropzone;
