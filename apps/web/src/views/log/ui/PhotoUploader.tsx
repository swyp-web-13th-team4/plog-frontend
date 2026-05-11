'use client';

import { type ChangeEvent, type Ref, useEffect, useRef } from 'react';

import Image from 'next/image';

import { Icon } from '@plog/ui';

import {
  isNewPhotoPreview,
  MAX_PHOTO_COUNT,
  type PhotoPreview,
} from '../model/use-photo-upload';

type PhotoUploaderProps = {
  photos: PhotoPreview[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  onFileSizeExceeded?: () => void;
  uploadButtonRef?: Ref<HTMLButtonElement>;
};

const MAX_PHOTO_FILE_SIZE = 10 * 1024 * 1024;

export default function PhotoUploader({
  photos,
  onAdd,
  onRemove,
  onFileSizeExceeded,
  uploadButtonRef,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMore = photos.length < MAX_PHOTO_COUNT;

  useEffect(() => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    photos
      .filter(isNewPhotoPreview)
      .forEach(({ file }) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  }, [photos]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ACCEPTED_TYPES = new Set([
      'image/jpeg',
      'image/png',
      'image/heic',
      'image/heif',
    ]);
    const acceptedFiles = Array.from(event.target.files ?? []).filter((file) =>
      ACCEPTED_TYPES.has(file.type),
    );
    const selectedFiles = acceptedFiles.filter(
      (file) => file.size <= MAX_PHOTO_FILE_SIZE,
    );

    if (acceptedFiles.length !== selectedFiles.length) {
      onFileSizeExceeded?.();
    }

    event.target.value = '';

    if (selectedFiles.length === 0) return;
    onAdd(selectedFiles);
  };

  return (
    <div className="flex gap-4 pt-1 pb-1">
      <input
        ref={fileInputRef}
        type="file"
        name="photos"
        accept=".jpg, .jpeg, .png, .heic"
        multiple
        className="sr-only"
        onChange={handleFileChange}
      />
      <button
        ref={uploadButtonRef}
        type="button"
        disabled={!canAddMore}
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
                className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-semantic-object-inverse bg-semantic-theme-red-normal text-xl leading-none shadow-[0_2px_6px_rgba(0,0,0,0.16)]"
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
