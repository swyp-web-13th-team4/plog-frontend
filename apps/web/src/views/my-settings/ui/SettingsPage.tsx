'use client';

import { useRouter } from 'next/navigation';

import { AppBar, Icon, type IconName } from '@plog/ui';
import { cn } from '@plog/utils';

type MenuItemProps = {
  title: string;
  iconName: IconName;
  onClick: () => void;
  destructive?: boolean;
  className?: string;
};

function MenuItem({
  title,
  iconName,
  onClick,
  destructive = false,
  className,
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'label-lg flex h-18 cursor-pointer items-center gap-5 p-6 text-semantic-object-boldest',
        destructive && 'text-semantic-feedback-error-normal',
        className,
      )}
      onClick={onClick}
    >
      <Icon
        name={iconName}
        size={24}
        className={cn(
          'text-semantic-object-subtle',
          destructive && 'text-semantic-feedback-error-normal',
        )}
      />
      {title}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="설정"
          onBack={() => router.back()}
        />
      </header>
      <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] flex-col divide-y divide-semantic-stroke-subtle pt-[var(--spacing-header)]">
        <section>
          <MenuItem title="로그아웃" iconName="logout" onClick={() => {}} />
          <MenuItem
            title="탈퇴하기"
            iconName="block"
            onClick={() => {}}
            destructive
          />
        </section>
      </div>
    </>
  );
}
