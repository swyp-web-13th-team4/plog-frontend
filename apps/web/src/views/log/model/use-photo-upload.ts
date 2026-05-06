import { useEffect, useRef, useState } from 'react';

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
    return () => {
      photoPreviewsRef.current.forEach(({ url }) => URL.revokeObjectURL(url));
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
      if (targetPhoto) URL.revokeObjectURL(targetPhoto.url);

      return currentPhotos.filter((photo) => photo.id !== id);
    });
  };

  return { photos, handleAddPhotos, handleRemovePhoto };
}
