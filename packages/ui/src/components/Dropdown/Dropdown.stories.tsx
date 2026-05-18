import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon/Icon';

import Dropdown from './Dropdown';

const ITEMS = [
  { label: '삭제하기', value: 'delete' },
  { label: '수정하기', value: 'edit' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '버튼을 눌러 명령 목록을 표시하는 메뉴 컴포넌트입니다. `items`와 `onSelect`로 액션을 구성할 수 있습니다.',
      },
    },
  },
  argTypes: {
    items: {
      description: '메뉴에 표시할 액션 목록입니다.',
      table: {
        type: {
          summary: '{ label: string; value: string; disabled?: boolean }[]',
        },
      },
    },
    onSelect: {
      description: '메뉴 아이템을 선택했을 때 호출됩니다.',
      action: 'selected',
    },
    disabled: {
      description: '비활성화 상태입니다. 메뉴를 열 수 없습니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'aria-label': {
      description:
        '단독으로 사용할 때 스크린리더에 전달할 레이블입니다. `aria-labelledby`와 동시에 사용할 수 없습니다.',
      control: 'text',
    },
    'aria-labelledby': {
      description:
        '레이블 역할을 하는 요소의 id를 지정합니다. `aria-label`과 동시에 사용할 수 없습니다.',
      control: 'text',
    },
    trigger: { table: { disable: true } },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
    triggerClassName: { table: { disable: true } },
    positionerClassName: { table: { disable: true } },
    contentClassName: { table: { disable: true } },
    itemClassName: { table: { disable: true } },
  },
  args: {
    items: ITEMS,
    trigger: <Icon name="more-vertical" />,
    disabled: false,
    'aria-label': '게시글 관리 메뉴',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    items: ITEMS,
    trigger: <Icon name="more-vertical" />,
    'aria-label': '게시글 관리 메뉴',
  },
};

export const WithDisabledItem: Story = {
  parameters: {
    docs: {
      description: {
        story: '일부 액션만 비활성화할 수 있습니다.',
      },
    },
  },
  args: {
    items: [
      { label: '삭제하기', value: 'delete' },
      { label: '수정하기', value: 'edit', disabled: true },
    ],
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태에서는 메뉴를 열 수 없습니다.',
      },
    },
  },
  args: {
    disabled: true,
  },
};
