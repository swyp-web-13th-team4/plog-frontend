'use client';

import { useRouter } from 'next/navigation';

import { AppBar, Icon, TabGroup } from '@plog/ui';

import AnalysisTab from './analysis/AnalysisTab';
import BookmarkTab from './BookmarkTab';
import ProfileSection from './ProfileSection';
import RecordTab from './RecordTab';

const TABS = [
  {
    value: 'record',
    label: '기록',
    icon: <Icon name="pencil" size={20} />,
    activeIcon: <Icon name="pencil-filled" size={20} />,
    panel: <RecordTab />,
  },
  {
    value: 'bookmark',
    label: '북마크',
    icon: <Icon name="bookmark" size={20} />,
    activeIcon: <Icon name="bookmark-filled" size={20} />,
    panel: <BookmarkTab />,
  },
  {
    value: 'badge',
    label: '뱃지',
    icon: <Icon name="badge" size={20} />,
    activeIcon: <Icon name="badge-filled" size={20} />,
    panel: (
      <div className="flex items-center justify-center py-20 text-semantic-object-subtle">
        <p className="body-sm">뱃지 탭은 준비 중이에요.</p>
      </div>
    ),
    disabled: true,
  },
  {
    value: 'analysis',
    label: '분석',
    icon: <Icon name="document" size={20} />,
    activeIcon: <Icon name="document-filled" size={20} />,
    panel: <AnalysisTab />,
  },
];

export default function MyPage() {
  const router = useRouter();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 mx-auto max-w-layout">
        <AppBar
          variant="navigation"
          title="마이페이지"
          actions={
            <AppBar.Action
              icon={<Icon name="setting" size={28} />}
              aria-label="설정"
              onClick={() => router.push('/my/settings')}
            />
          }
        />
      </header>
      <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] flex-col pt-[var(--spacing-header)]">
        <ProfileSection />
        <TabGroup
          items={TABS}
          defaultValue="record"
          className="flex flex-1 flex-col"
          listClassName="sticky top-[var(--spacing-header)] z-10 border-b border-b-semantic-stroke-subtle bg-semantic-bg-standard"
          panelClassName="flex flex-1"
        />
      </div>
    </>
  );
}
