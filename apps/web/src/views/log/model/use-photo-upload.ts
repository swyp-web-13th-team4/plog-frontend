import { useEffect, useRef, useState } from 'react';

import { type PostEditImage } from '@/entities/feed';

export type NewPhotoPreview = {
  type: 'new';
  id: string;
  file: File;
  url: string;
};

export type ExistingPhotoPreview = {
  type: 'existing';
  id: string;
  imageId: number;
  url: string;
};

export type PhotoPreview = NewPhotoPreview | ExistingPhotoPreview;

export const MAX_PHOTO_COUNT = 5;

function createPhotoPreview(file: File, index: number): NewPhotoPreview {
  return {
    type: 'new',
    id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
    file,
    url: URL.createObjectURL(file),
  };
}

function createExistingPhotoPreview(
  image: PostEditImage,
): ExistingPhotoPreview {
  return {
    type: 'existing',
    id: `existing-${image.id}`,
    imageId: image.id,
    url: image.url,
  };
}

export function isNewPhotoPreview(
  photo: PhotoPreview,
): photo is NewPhotoPreview {
  return photo.type === 'new';
}

function revokePhotoUrl(photo: PhotoPreview) {
  if (isNewPhotoPreview(photo)) URL.revokeObjectURL(photo.url);
}

export function usePhotoUpload() {
  const photoPreviewsRef = useRef<PhotoPreview[]>([]);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  useEffect(() => {
    photoPreviewsRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photoPreviewsRef.current.forEach(revokePhotoUrl);
    };
  }, []);

  const handleAddPhotos = (files: File[]) => {
    setPhotos((currentPhotos) => {
      const availableCount = MAX_PHOTO_COUNT - currentPhotos.length;
      const nextFiles = files.slice(0, availableCount);
      return [
        ...currentPhotos,
        ...nextFiles.map((file, index) => createPhotoPreview(file, index)),
      ];
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((currentPhotos) => {
      const targetPhoto = currentPhotos.find((photo) => photo.id === id);
      if (targetPhoto) revokePhotoUrl(targetPhoto);
      return currentPhotos.filter((photo) => photo.id !== id);
    });
  };

  const setExistingPhotos = (images: PostEditImage[]) => {
    photoPreviewsRef.current.forEach(revokePhotoUrl);
    setPhotos(images.slice(0, MAX_PHOTO_COUNT).map(createExistingPhotoPreview));
  };

  const clearPhotos = () => {
    photoPreviewsRef.current.forEach(revokePhotoUrl);
    setPhotos([]);
  };

  return {
    photos,
    handleAddPhotos,
    handleRemovePhoto,
    setExistingPhotos,
    clearPhotos,
  };
}
