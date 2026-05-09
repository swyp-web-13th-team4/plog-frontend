import { create } from 'zustand';

import { type PostImage } from './types';

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

function createExistingPhotoPreview(image: PostImage): ExistingPhotoPreview {
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

type PhotoStore = {
  photos: PhotoPreview[];
  setPhotos: (
    updater: PhotoPreview[] | ((prev: PhotoPreview[]) => PhotoPreview[]),
  ) => void;
};

const usePhotoStore = create<PhotoStore>()((set) => ({
  photos: [],
  setPhotos: (updater) =>
    set((state) => ({
      photos: typeof updater === 'function' ? updater(state.photos) : updater,
    })),
}));

export function usePhotoUpload() {
  const photos = usePhotoStore((state) => state.photos);
  const setPhotos = usePhotoStore((state) => state.setPhotos);

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

  const setExistingPhotos = (images: PostImage[]) => {
    setPhotos((currentPhotos) => {
      currentPhotos.forEach(revokePhotoUrl);
      return images.slice(0, MAX_PHOTO_COUNT).map(createExistingPhotoPreview);
    });
  };

  const clearPhotos = () => {
    setPhotos((currentPhotos) => {
      currentPhotos.forEach(revokePhotoUrl);
      return [];
    });
  };

  return {
    photos,
    handleAddPhotos,
    handleRemovePhoto,
    setExistingPhotos,
    clearPhotos,
  };
}
