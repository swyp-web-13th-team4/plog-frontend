import { useToast } from '@plog/ui';

import {
  IMAGE_UPLOAD_MAX_FILE_SIZE,
  MAX_PHOTO_COUNT,
} from '@/shared/lib/image-upload-policy';

export function usePhotoUploadFeedback() {
  const { toast } = useToast();

  const handlePhotoFileSizeExceeded = () => {
    toast({
      type: 'error',
      description: `${IMAGE_UPLOAD_MAX_FILE_SIZE / (1024 * 1024)}MB 이하의 이미지 파일만 등록 가능해요.`,
    });
  };

  const handlePhotoConversionFailed = () => {
    toast({
      type: 'error',
      description: '사진 업로드에 실패했어요. 다시 시도해 주세요.',
    });
  };

  const handlePhotoMaxCountExceeded = () => {
    toast({
      type: 'error',
      description: `사진은 최대 ${MAX_PHOTO_COUNT}장까지 등록할 수 있어요.`,
    });
  };

  return {
    handlePhotoConversionFailed,
    handlePhotoFileSizeExceeded,
    handlePhotoMaxCountExceeded,
  };
}
