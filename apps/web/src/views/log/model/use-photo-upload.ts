import { useEffect, useRef, useState } from 'react';

import {
  clearCreateLogPhotoFiles,
  getCreateLogPhotoFiles,
  setCreateLogPhotoFiles,
} from '@/features/create-log';

export type PhotoPreview = {
  id: string;
  file: File;
  url: string;
};

export const MAX_PHOTO_COUNT = 5;

function createPhotoPreview(file: File, index: number): PhotoPreview {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
    file,
    url: URL.createObjectURL(file),
  };
}

export function usePhotoUpload() {
  const photoPreviewsRef = useRef<PhotoPreview[]>([]);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  useEffect(() => {
    photoPreviewsRef.current = photos;
  }, [photos]);

  useEffect(() => {
    let ignore = false;

    const restorePhotos = async () => {
      const storedFiles = await getCreateLogPhotoFiles();
      if (ignore || storedFiles.length === 0) return;

      setPhotos(
        storedFiles
          .slice(0, MAX_PHOTO_COUNT)
          .map((file, index) => createPhotoPreview(file, index)),
      );
    };

    void restorePhotos();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      photoPreviewsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleAddPhotos = (files: File[]) => {
    setPhotos((currentPhotos) => {
      const availableCount = MAX_PHOTO_COUNT - currentPhotos.length;
      const nextFiles = files.slice(0, availableCount);
      const nextPhotos = [
        ...currentPhotos,
        ...nextFiles.map((file, index) => createPhotoPreview(file, index)),
      ];

      void setCreateLogPhotoFiles(nextPhotos.map(({ file }) => file));
      return nextPhotos;
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((currentPhotos) => {
      const targetPhoto = currentPhotos.find((photo) => photo.id === id);
      if (targetPhoto) URL.revokeObjectURL(targetPhoto.url);
      const nextPhotos = currentPhotos.filter((photo) => photo.id !== id);

      void setCreateLogPhotoFiles(nextPhotos.map(({ file }) => file));
      return nextPhotos;
    });
  };

  const clearPhotos = () => {
    photoPreviewsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
    setPhotos([]);
    void clearCreateLogPhotoFiles();
  };

  return { photos, handleAddPhotos, handleRemovePhoto, clearPhotos };
}
