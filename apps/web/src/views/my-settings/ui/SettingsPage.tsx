'use client';

import { useRouter } from 'next/navigation';

import { AppBar, Icon, type IconName } from '@plog/ui';
import { cn } from '@plog/utils';

import { useLogoutMutation } from '@/entities/auth/model/use-logout-mutation';

import { dialog } from '@/shared/lib/dialog';

import { useDeleteAccountMutation } from '../model/use-delete-account-mutation';

type MenuItemProps = {
  title: string;
  iconName: IconName;
  onClick: () => void;
  destructive?: boolean;
  showChevron?: boolean;
  disabled?: boolean;
  className?: string;
};

function MenuItem({
  title,
  iconName,
  onClick,
  destructive = false,
  showChevron = false,
  disabled = false,
  className,
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'label-lg flex h-18 w-full cursor-pointer items-center gap-5 p-6 text-semantic-object-boldest hover:bg-semantic-bg-deep disabled:cursor-not-allowed disabled:opacity-40',
        destructive && 'text-semantic-feedback-error-normal',
        className,
      )}
      disabled={disabled}
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
      <span className="flex-1 text-start">{title}</span>
      {showChevron && (
        <Icon
          name="chevron-right"
          size={24}
          className={cn(
            'text-semantic-object-subtle',
            destructive && 'text-semantic-feedback-error-normal',
          )}
        />
      )}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  const logoutMutation = useLogoutMutation();
  const deleteAccountMutation = useDeleteAccountMutation();

  const isMutating =
    logoutMutation.isPending || deleteAccountMutation.isPending;

  const handleLogout = async () => {
    const confirmed = await dialog.confirm({
      message: '로그아웃 하시겠습니까?',
      confirmLabel: '로그아웃',
      cancelLabel: '취소',
    });
    if (confirmed) logoutMutation.mutate();
  };

  const handleDeleteAccount = async () => {
    const confirmed = await dialog.confirm({
      message: '정말 탈퇴하시겠습니까?',
      description: '탈퇴 시 모든 데이터가 삭제되며 복구할 수 없어요.',
      confirmLabel: '탈퇴하기',
      cancelLabel: '취소',
    });
    if (confirmed) deleteAccountMutation.mutate();
  };

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
        <section aria-label="계정">
          <MenuItem
            title="로그아웃"
            iconName="logout"
            onClick={handleLogout}
            disabled={isMutating}
          />
          <MenuItem
            title="탈퇴하기"
            iconName="block"
            onClick={handleDeleteAccount}
            destructive
            disabled={isMutating}
          />
        </section>
      </div>
    </>
  );
}
