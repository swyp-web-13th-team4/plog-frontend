'use client';

import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  useRef,
} from 'react';

import { Avatar, BottomSheet, Button, Icon, useToast } from '@plog/ui';

import { type DefaultProfileImage } from '@/entities/user';

import { convertImageToJpeg } from '@/shared/lib/convert-image';
import {
  IMAGE_INPUT_ACCEPT,
  IMAGE_UPLOAD_MAX_FILE_SIZE,
} from '@/shared/lib/image-upload-policy';

type ProfileImageSheetProps = {
  defaultImages: DefaultProfileImage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImageId: number | null;
  onSelectedImageIdChange: (id: number | null) => void;
  onSelectDefault: (imageId: number) => void;
  onUpload: (file: File) => void;
};

export default function ProfileImageSheet({
  defaultImages,
  open,
  onOpenChange,
  selectedImageId,
  onSelectedImageIdChange,
  onSelectDefault,
  onUpload,
}: ProfileImageSheetProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { toast } = useToast();

  const handleImageUploadClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    imageInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > IMAGE_UPLOAD_MAX_FILE_SIZE) {
      e.currentTarget.value = '';
      toast({
        type: 'error',
        description: '10MB 이하의 이미지 파일만 등록 가능해요.',
      });
      return;
    }
    e.currentTarget.value = '';

    const converted = await convertImageToJpeg(file);
    if (!converted) {
      toast({
        type: 'error',
        description: '사진 업로드에 실패했어요. 다시 시도해 주세요.',
      });
      return;
    }

    onUpload(converted);
    onOpenChange(false);
  };

  const handleRadioKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = defaultImages.length;
    const currentIndex = defaultImages.findIndex(
      (img) => img.id === selectedImageId,
    );

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex =
        currentIndex === -1 ? count - 1 : (currentIndex - 1 + count) % count;
    }

    if (nextIndex !== null) {
      onSelectedImageIdChange(defaultImages[nextIndex].id);
      radioRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = () => {
    if (selectedImageId === null) return;
    onSelectDefault(selectedImageId);
    onOpenChange(false);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content className="max-w-layout">
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>사용할 프로필을 선택해 주세요.</BottomSheet.Title>
          <BottomSheet.CloseButton />
        </BottomSheet.Header>
        <BottomSheet.Body>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6 pb-12">
            <div
              role="radiogroup"
              aria-label="기본 프로필 이미지"
              className="contents"
              onKeyDown={handleRadioKeyDown}
            >
              {defaultImages.map((img, index) => (
                <button
                  key={img.id}
                  ref={(el) => {
                    radioRefs.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-label={`기본 프로필 이미지 ${index + 1}`}
                  aria-checked={selectedImageId === img.id}
                  tabIndex={
                    selectedImageId === img.id ||
                    (selectedImageId === null && index === 0)
                      ? 0
                      : -1
                  }
                  className="relative flex aspect-square w-full min-w-0 cursor-pointer items-center"
                  onClick={() => onSelectedImageIdChange(img.id)}
                >
                  <Avatar
                    size="medium"
                    alt=""
                    src={img.imageUrl}
                    containerClassName="size-full"
                    selected={selectedImageId === img.id}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="기기에서 이미지 선택"
              className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-full bg-semantic-bg-deep outline outline-semantic-stroke-neutral/30"
              onClick={handleImageUploadClick}
            >
              <Icon
                name="plus"
                size={32}
                className="text-semantic-object-normal"
              />
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept={IMAGE_INPUT_ACCEPT}
              aria-hidden
              tabIndex={-1}
              className="invisible"
              onChange={handleFileChange}
            />
          </div>
          <Button
            size="large"
            fullWidth
            disabled={selectedImageId === null}
            onClick={handleSubmit}
          >
            선택하기
          </Button>
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  );
}
