import { useEffect, useRef, useState } from 'react';

import {
  type DefaultProfileImage,
  type ProfileImageOption,
} from '@/entities/user';

export function useProfileImage(defaultImages: DefaultProfileImage[]) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>();
  const [imageOption, setImageOption] = useState<ProfileImageOption | null>(
    null,
  );
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const prevBlobUrlRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (prevBlobUrlRef.current) URL.revokeObjectURL(prevBlobUrlRef.current);
    };
  }, []);

  const openSheet = () => {
    setSelectedImageId(
      imageOption?.type === 'default' ? imageOption.imageId : null,
    );
    setIsSheetOpen(true);
  };

  const selectDefault = (imageId: number) => {
    const image = defaultImages.find((img) => img.id === imageId);
    if (!image) return;
    if (prevBlobUrlRef.current) {
      URL.revokeObjectURL(prevBlobUrlRef.current);
      prevBlobUrlRef.current = undefined;
    }
    setAvatarSrc(image.imageUrl);
    setImageOption({ type: 'default', imageId });
  };

  const upload = (file: File) => {
    if (prevBlobUrlRef.current) URL.revokeObjectURL(prevBlobUrlRef.current);
    const url = URL.createObjectURL(file);
    prevBlobUrlRef.current = url;
    setAvatarSrc(url);
    setImageOption({ type: 'upload', file });
  };

  return {
    isSheetOpen,
    setIsSheetOpen,
    avatarSrc,
    imageOption,
    selectedImageId,
    setSelectedImageId,
    openSheet,
    selectDefault,
    upload,
  };
}
