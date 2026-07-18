'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AppBar, Icon, TabGroup } from '@plog/ui';

import { NavigationHeader } from '@/shared/ui';

import AnalysisTab from './analysis/AnalysisTab';
import BadgeTab from './BadgeTab';
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
    label: '배지',
    icon: <Icon name="badge" size={20} />,
    activeIcon: <Icon name="badge-filled" size={20} />,
    panel: <BadgeTab />,
  },
  {
    value: 'analysis',
    label: '분석',
    icon: <Icon name="document" size={20} />,
    activeIcon: <Icon name="document-filled" size={20} />,
    panel: <AnalysisTab />,
  },
];

const TAB_VALUES = TABS.map((t) => t.value);

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab = TAB_VALUES.includes(tabParam ?? '') ? tabParam : 'record';

  return (
    <>
      <NavigationHeader
        title="마이페이지"
        onBack={null}
        actions={
          <AppBar.Action
            icon={<Icon name="setting" size={28} />}
            aria-label="설정"
            onClick={() => router.push('/my/settings')}
          />
        }
      />
      <div className="flex min-h-[calc(100dvh-var(--spacing-bottom-tab))] flex-col pt-[var(--spacing-header)]">
        <ProfileSection />
        <TabGroup
          items={TABS}
          value={activeTab}
          onValueChange={(tab) => router.replace(`/my?tab=${tab}`)}
          className="flex flex-1 flex-col"
          listClassName="sticky top-[var(--spacing-header)] z-10 border-b border-b-semantic-stroke-subtle bg-semantic-bg-standard"
          panelClassName="flex flex-1"
        />
      </div>
    </>
  );
}
