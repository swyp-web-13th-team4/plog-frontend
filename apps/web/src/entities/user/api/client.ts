import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import { analyticsDataSchema, mypageDataSchema } from '../model/schemas';
import {
  type ProfileImageOption,
  type SetupProfileRequest,
  type TermsAgreements,
} from '../model/types';

export const validateNickname = (nickname: string) =>
  clientApi.get<string>(
    `/members/validate/nickname?${new URLSearchParams({ nickname })}`,
  );

export const validateIntroduction = (introduction: string) =>
  clientApi.get<string>(
    `/members/validate/introduction?${new URLSearchParams({ introduction })}`,
  );

export const signup = (
  data: SetupProfileRequest & { termsAgreements: TermsAgreements },
  image: ProfileImageOption,
) => {
  const endpoint =
    image.type === 'default'
      ? `/members/signup?defaultImageId=${image.imageId}`
      : '/members/signup';
  const formData = createMultipartRequest(
    data,
    image.type === 'upload' ? { profileImage: image.file } : undefined,
  );
  return clientApi.post<string>(endpoint, formData);
};

export const getMypage = () =>
  clientApi.get('/members/mypage', mypageDataSchema);

export const getAnalytics = () =>
  clientApi.get('/members/analytics', analyticsDataSchema);

export const updateProfile = (
  data: SetupProfileRequest,
  imageOption: ProfileImageOption | null,
) => {
  const endpoint =
    imageOption?.type === 'default'
      ? `/members/me/profile?defaultImageId=${imageOption.imageId}`
      : '/members/me/profile';

  const formData = createMultipartRequest(
    data,
    imageOption?.type === 'upload'
      ? { profileImage: imageOption.file }
      : undefined,
  );

  return clientApi.patch<string>(endpoint, formData);
};
