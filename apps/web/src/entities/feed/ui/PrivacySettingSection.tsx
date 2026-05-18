import { Icon } from '@plog/ui';
import { cn } from '@plog/utils';

import { type PostScope } from '../model/types';

const PRIVACY_SETTING_OPTIONS = [
  {
    type: 'all',
    title: '이 기록은 피드에 공유됩니다',
    content: '다른 사용자들이 회원님의 환경 기록을 볼 수 있습니다.',
  },
  {
    type: 'private',
    title: '이 기록은 나만 볼 수 있습니다',
    content: '비공개로 설정되어 다른 사용자들이 볼 수 없습니다.',
  },
] as const;

type PrivacySettingSectionProps = {
  scope: PostScope;
};

export default function PrivacySettingSection({
  scope,
}: PrivacySettingSectionProps) {
  const isPublic = scope === 'PUBLIC';
  const privacyType = isPublic ? 'all' : 'private';
  const { title, content } =
    PRIVACY_SETTING_OPTIONS.find(({ type }) => type === privacyType) ??
    PRIVACY_SETTING_OPTIONS[0];

  return (
    <div
      className={cn(
        'flex gap-2 rounded-xl p-4',
        isPublic ? 'bg-semantic-accent-subtler' : 'bg-semantic-object-subtler',
      )}
    >
      <div
        className={cn(
          'shrink-0',
          isPublic
            ? 'text-semantic-accent-normal'
            : 'text-semantic-object-normal',
        )}
      >
        <Icon
          name="circle-exclamation"
          className={`${isPublic ? 'text-semantic-accent-normal' : 'text-semantic-object-normal'}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="label-lg text-semantic-object-bold">{title}</p>
        <p className="label-md mt-1 text-semantic-object-normal">{content}</p>
      </div>
    </div>
  );
}
