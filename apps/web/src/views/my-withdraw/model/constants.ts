import { type RadioGroupOption } from '@plog/ui';

export const WITHDRAW_REASONS = {
  no_longer_use: '더 이상 서비스를 이용하지 않아요',
  unsatisfied: '서비스 이용이 불만족스러워요',
  using_other_service: '다른 유사 서비스를 사용하고 있어요',
  delete_personal_data: '개인정보를 삭제하고 싶어요',
  create_new_account: '새 계정을 만들고 싶어요',
  etc: '기타',
} as const;

export type WithdrawReason = keyof typeof WITHDRAW_REASONS;

export const WITHDRAW_REASON_OPTIONS: RadioGroupOption[] = Object.entries(
  WITHDRAW_REASONS,
).map(([value, label]) => ({ value, label }));

export const ETC_DETAIL_MAX_LENGTH = 200;

export const WITHDRAW_NOTICES = [
  '회원 탈퇴는 철회할 수 없습니다.',
  '탈퇴 완료 시 서비스 내에 기록한 데이터 및 북마크 정보 등은 모두 삭제되며, 삭제된 데이터는 복구가 불가능합니다.',
  '관련 법령 및 개인정보 처리방침에 따라 회사가 정보를 보유해야 하는 일부 데이터는 관련 법령에 의거하여 안전하게 보관 후 파기됩니다.',
];
