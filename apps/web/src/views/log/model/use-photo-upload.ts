import { useCallback, useEffect, useRef } from 'react';

import { MAX_PHOTO_COUNT } from './image-policy';

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

function createPhotoPreview(file: File, index: number): NewPhotoPreview {
  return {
    type: 'new',
    id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
    file,
    url: URL.createObjectURL(file),
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

type UsePhotoUploadOptions = {
  photos: PhotoPreview[];
  onPhotosChange: (photos: PhotoPreview[]) => void;
};

export function usePhotoUpload({
  photos,
  onPhotosChange,
}: UsePhotoUploadOptions) {
  const photosRef = useRef(photos);
  const previousPhotosRef = useRef(photos);

  useEffect(() => {
    previousPhotosRef.current
      .filter((previousPhoto) =>
        photos.every((photo) => photo.id !== previousPhoto.id),
      )
      .forEach(revokePhotoUrl);

    photosRef.current = photos;
    previousPhotosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach(revokePhotoUrl);
    };
  }, []);

  const handleAddPhotos = useCallback(
    (files: File[]) => {
      const currentPhotos = photosRef.current;
      const availableCount = MAX_PHOTO_COUNT - currentPhotos.length;
      const nextFiles = files.slice(0, availableCount);

      onPhotosChange([
        ...currentPhotos,
        ...nextFiles.map((file, index) => createPhotoPreview(file, index)),
      ]);
    },
    [onPhotosChange],
  );

  const handleRemovePhoto = useCallback(
    (id: string) => {
      const currentPhotos = photosRef.current;
      const targetPhoto = currentPhotos.find((photo) => photo.id === id);

      if (targetPhoto) revokePhotoUrl(targetPhoto);
      onPhotosChange(currentPhotos.filter((photo) => photo.id !== id));
    },
    [onPhotosChange],
  );

  const clearPhotos = useCallback(() => {
    photosRef.current.forEach(revokePhotoUrl);
    onPhotosChange([]);
  }, [onPhotosChange]);

  return {
    handleAddPhotos,
    handleRemovePhoto,
    clearPhotos,
  };
}
