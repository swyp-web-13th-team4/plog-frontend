'use client';

import { type ChangeEvent, type Ref, useRef } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';

import { convertImageToJpeg } from '@/shared/lib/convert-image';
import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_INPUT_ACCEPT,
  IMAGE_UPLOAD_MAX_FILE_SIZE,
  MAX_PHOTO_COUNT,
} from '@/shared/lib/image-upload-policy';

import { type PhotoPreview } from '../model/use-photo-upload';

type PhotoUploaderProps = {
  photos: PhotoPreview[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  onFileSizeExceeded?: () => void;
  onConversionFailed?: () => void;
  uploadButtonRef?: Ref<HTMLButtonElement>;
};

export default function PhotoUploader({
  photos,
  onAdd,
  onRemove,
  onFileSizeExceeded,
  onConversionFailed,
  uploadButtonRef,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMoreImages = photos.length < MAX_PHOTO_COUNT;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = Array.from(event.target.files ?? []).filter((file) =>
      ACCEPTED_IMAGE_TYPES.has(file.type),
    );
    const selectedFiles = acceptedFiles.filter(
      (file) => file.size <= IMAGE_UPLOAD_MAX_FILE_SIZE,
    );

    if (acceptedFiles.length !== selectedFiles.length) {
      onFileSizeExceeded?.();
    }

    event.target.value = '';

    if (selectedFiles.length === 0) return;

    const results = await Promise.all(selectedFiles.map(convertImageToJpeg));
    const converted = results.filter((f): f is File => f !== null);

    if (converted.length < results.length) {
      onConversionFailed?.();
    }

    if (converted.length === 0) return;
    onAdd(converted);
  };

  return (
    <div className="flex gap-4 pt-1 pb-1">
      <input
        ref={fileInputRef}
        type="file"
        name="photos"
        accept={IMAGE_INPUT_ACCEPT}
        multiple
        className="sr-only"
        onChange={handleFileChange}
      />
      <button
        ref={uploadButtonRef}
        type="button"
        disabled={!canAddMoreImages}
        className="flex size-25 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-semantic-stroke-subtle bg-semantic-system-white text-semantic-object-normal transition-colors hover:bg-semantic-bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-semantic-stroke-subtle disabled:cursor-not-allowed disabled:text-semantic-object-subtle"
        aria-label="사진 등록"
        onClick={() => fileInputRef.current?.click()}
      >
        <Icon name="camera-filled" />
        <span className="label-sm">
          {photos.length}/{MAX_PHOTO_COUNT}
        </span>
      </button>
      <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative size-25 shrink-0 overflow-hidden rounded-xl bg-semantic-object-subtler"
            >
              <Image
                src={photo.url}
                alt={`등록된 사진 ${index + 1}`}
                fill
                sizes="100px"
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-semantic-system-white bg-semantic-theme-red-normal text-xl leading-none shadow-[0_2px_6px_rgba(0,0,0,0.16)]"
                aria-label={`등록된 사진 ${index + 1} 삭제`}
                onClick={() => onRemove(photo.id)}
              >
                <Icon
                  name="close"
                  className="text-semantic-object-inverse"
                  size={16}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
