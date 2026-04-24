import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';

import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '앱 상단에 위치하는 내비게이션 바입니다. 액션 버튼은 `AppBar.Action`으로 추가합니다.\n\n페이지 이동이 목적인 `AppBar.Action`은 `render` prop에 라우터 링크 컴포넌트를 전달하고 `nativeButton={false}`를 함께 설정하세요. `<a>` 태그로 렌더링되어 스크린리더에서 링크로 인식되고, 새 탭에서 열기 등 브라우저 기본 동작도 지원됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

const NAVIGATION_CODE = `\
// Next.js 사용 시
<header>
  <AppBar
    variant="navigation"
    title="페이지 제목"
    onBack={router.back}
    actions={
      <AppBar.Action
        render={<Link href="/menu" />}
        nativeButton={false}
        icon={<Icon />}
        aria-label="메뉴"
      />
    }
  />
</header>`;

const BRAND_CODE = `\
// Next.js 사용 시
<header>
  <AppBar
    variant="brand"
    logo={<Link href="/"><img src={logoSrc} alt="로고" /></Link>}
    actions={
      <AppBar.Action icon={<Icon />} aria-label="메뉴" />
    }
  />
</header>`;

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '하위 페이지에 사용합니다. `onBack`을 전달하면 뒤로 가기 버튼이 표시됩니다.',
      },
      source: { code: NAVIGATION_CODE },
    },
  },
  render: () => (
    <AppBar
      variant="navigation"
      title="페이지 제목"
      onBack={() => {}}
      actions={<AppBar.Action icon={<BlankIcon />} aria-label="메뉴" />}
    />
  ),
};

export const Brand: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '최상위 페이지에 사용합니다. `logo`에 브랜드 로고 이미지나 컴포넌트를 전달합니다.',
      },
      source: { code: BRAND_CODE },
    },
  },
  render: () => (
    <AppBar
      variant="brand"
      logo={<div className="h-8 w-28 bg-semantic-bg-deeper" />}
      actions={<AppBar.Action icon={<BlankIcon />} aria-label="메뉴" />}
    />
  ),
};
