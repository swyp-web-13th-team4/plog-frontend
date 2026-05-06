import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

import {
  type AnalyticsData,
  type MypageData,
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

export const getMypage = () => clientApi.get<MypageData>('/members/mypage');

export const getAnalytics = () =>
  clientApi.get<AnalyticsData>('/members/analytics');

export const updateProfile = (
  data: SetupProfileRequest,
  imageOption: ProfileImageOption | null,
) => {
  const formData = new FormData();
  formData.append('nickname', data.nickname);
  if (data.introduction) formData.append('introduction', data.introduction);

  if (imageOption?.type === 'upload') {
    formData.append('image', imageOption.file);
    return clientApi.patch<string>('/members/me/profile', formData);
  }

  if (imageOption?.type === 'default') {
    return clientApi.patch<string>(
      `/members/me/profile?defaultImageId=${imageOption.imageId}`,
      formData,
    );
  }

  return clientApi.patch<string>('/members/me/profile', formData);
};
