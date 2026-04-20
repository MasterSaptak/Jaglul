import React, { useRef, useState, DragEvent } from 'react';
import { Upload, ImageIcon, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const ImageUpload: React.FC = () => {
  const { uploadImages, isUploading, storageUsedKB, maxStorageKB } = useGallery();
  const [isDragging, setIsDragging] = useState(false);
  const [lastResult, setLastResult] = useState<{ success: number; skipped: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const storagePercent = Math.min(100, Math.round((storageUsedKB / maxStorageKB) * 100));
  const isNearLimit = storagePercent >= 80;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setLastResult(null);
    const result = await uploadImages(imageFiles);
    setLastResult(result);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  return (
    <div className="bg-white rounded-xl border border-army-green/20 p-5 space-y-4">
      {/* Storage Bar */}
      <div>
        <div className="flex justify-between text-xs text-army-olive/70 mb-1">
          <span>Storage Used</span>
          <span className={isNearLimit ? 'text-orange-500 font-semibold' : ''}>
            {storageUsedKB} KB / {maxStorageKB} KB ({storagePercent}%)
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              storagePercent >= 90 ? 'bg-red-500' : isNearLimit ? 'bg-orange-400' : 'bg-army-green'
            }`}
            style={{ width: `${storagePercent}%` }}
          />
        </div>
        {isNearLimit && (
          <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
            <AlertTriangle size={12} /> Storage almost full — older images may be skipped
          </p>
        )}
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-army-green bg-army-green/5 scale-[1.01]'
            : 'border-army-green/30 hover:border-army-green/60 hover:bg-army-green/[0.02]'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-army-olive">
            <Loader2 size={32} className="animate-spin" />
            <p className="font-medium">Compressing & saving…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-army-olive/60">
            <Upload size={32} className={isDragging ? 'text-army-green' : ''} />
            <p className="font-medium text-army-navy">Drop images here or click to upload</p>
            <p className="text-xs">Images are auto-compressed to ~800px · JPEG 70% quality</p>
          </div>
        )}
      </div>

      {/* Result Toast */}
      {lastResult && (
        <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${
          lastResult.skipped > 0 ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-army-green'
        }`}>
          {lastResult.skipped > 0 ? (
            <><AlertTriangle size={16} /> {lastResult.success} uploaded, {lastResult.skipped} skipped (storage limit)</>
          ) : (
            <><CheckCircle2 size={16} /> {lastResult.success} image{lastResult.success !== 1 ? 's' : ''} uploaded successfully</>
          )}
        </div>
      )}
    </div>
  );
};
