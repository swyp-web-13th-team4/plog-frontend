import { type CreateLogStoredValues } from '@/features/create-log';

import { type PhotoPreview } from './use-photo-upload';

export type CreateLogFormValues = CreateLogStoredValues & {
  photos: PhotoPreview[];
};
