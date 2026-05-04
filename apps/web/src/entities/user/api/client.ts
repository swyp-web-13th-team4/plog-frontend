import { clientApi } from '@/shared/api/client-api';
import { createMultipartRequest } from '@/shared/api/create-multipart-request';

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
