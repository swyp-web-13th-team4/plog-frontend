import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';
import { Button } from '@/components/Button';

import EmptyState from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '콘텐츠가 존재하지 않는 상황에서 빈 화면을 채워주는 컴포넌트입니다. `graphic`, `description`, `actions`는 전달하지 않으면 해당 영역이 렌더링되지 않습니다.',
      },
    },
  },
  argTypes: {
    title: {
      description: '현재 상태를 한 줄로 요약하는 텍스트입니다.',
      control: 'text',
    },
    description: {
      description: '발생 원인이나 해결 방법을 설명하는 텍스트입니다.',
      control: 'text',
    },
    graphic: {
      description: '제목 상단에 렌더링되는 일러스트 또는 아이콘 영역입니다.',
      table: { type: { summary: 'ReactNode' } },
      control: false,
    },
    actions: {
      description: '하단 액션 버튼 슬롯입니다.',
      table: { type: { summary: 'ReactNode' } },
      control: false,
    },
    className: { table: { disable: true } },
  },
  args: {
    title: '제목',
    description:
      '해당 페이지의 목적과 상태를 간결하게 설명합니다.\n사용자가 다음 행동을 이해할 수 있도록 안내합니다.',
    graphic: <BlankIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: '`actions`를 전달하여 CTA를 추가할 수 있습니다.',
      },
    },
  },
  args: {
    actions: (
      <Button variant="outline" size="small">
        버튼
      </Button>
    ),
  },
};

export const WithoutGraphic: Story = {
  parameters: {
    docs: {
      description: {
        story: '`graphic`을 전달하지 않으면 그래픽 영역이 렌더링되지 않습니다.',
      },
    },
  },
  args: {
    graphic: undefined,
    actions: (
      <Button variant="outline" size="small">
        버튼
      </Button>
    ),
  },
};
