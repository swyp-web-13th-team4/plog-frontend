import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import BlankIcon from '@/assets/blank.svg?react';
import { Button } from '@/components/Button';

import ToastProvider from './ToastProvider';
import { useToast } from './useToast';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 짧은 피드백 메시지를 전달하는 컴포넌트입니다. `useToast` 훅으로 토스트를 생성하며, `type`에 따라 아이콘과 색상이 달라집니다.\n\n`ToastProvider`의 `timeout`으로 자동 닫힘 시간을, `limit`으로 동시에 표시할 수 있는 토스트의 개수를 조절할 수 있습니다.\n',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

const DEFAULT_CODE = `\
const { toast } = useToast();

<Button onClick={() => toast({ description: '기본 토스트입니다.' })}>
  토스트 띄우기
</Button>`;

const WITH_ICON_CODE = `\
const { toast } = useToast();

<Button onClick={() => toast({ icon: <Icon />, description: '기본 토스트입니다.' })}>
  토스트 띄우기
</Button>`;

const SUCCESS_CODE = `\
const { toast } = useToast();

<Button onClick={() => toast({ type: 'success', description: '성공 토스트입니다.' })}>
  토스트 띄우기
</Button>`;

const ERROR_CODE = `\
const { toast } = useToast();

<Button onClick={() => toast({ type: 'error', description: '에러 토스트입니다.' })}>
  토스트 띄우기
</Button>`;

const DEDUPLICATED_CODE = `\
const { toast } = useToast();

<Button
  onClick={() =>
    toast({ id: 'toast', type: 'error', description: '에러 토스트입니다.' })
  }
>
  토스트 띄우기
</Button>`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '아이콘 없이 텍스트만 표시하는 기본 토스트입니다.',
      },
      source: { code: DEFAULT_CODE },
    },
  },
  render: function Render() {
    const { toast } = useToast();
    return (
      <Button onClick={() => toast({ description: '기본 토스트입니다.' })}>
        토스트 띄우기
      </Button>
    );
  },
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: '`default` 타입에서 `icon`을 전달하면 아이콘이 함께 표시됩니다.',
      },
      source: { code: WITH_ICON_CODE },
    },
  },
  render: function Render() {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({ icon: <BlankIcon />, description: '기본 토스트입니다.' })
        }
      >
        토스트 띄우기
      </Button>
    );
  },
};

export const Success: Story = {
  parameters: {
    docs: {
      description: {
        story: '작업이 성공했을 때 사용합니다. 항상 성공 아이콘이 표시됩니다.',
      },
      source: { code: SUCCESS_CODE },
    },
  },
  render: function Render() {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({ type: 'success', description: '성공 토스트입니다.' })
        }
      >
        토스트 띄우기
      </Button>
    );
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: '오류가 발생했을 때 사용합니다. 항상 에러 아이콘이 표시됩니다.',
      },
      source: { code: ERROR_CODE },
    },
  },
  render: function Render() {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            type: 'error',
            description: '에러 토스트입니다.',
          })
        }
      >
        토스트 띄우기
      </Button>
    );
  },
};

export const Deduplicated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '토스트를 같은 `id`로 다시 호출하면 새 토스트를 만들지 않고, 기존 토스트에 pulse 애니메이션을 적용합니다.',
      },
      source: { code: DEDUPLICATED_CODE },
    },
  },
  render: function Render() {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            id: 'toast',
            type: 'error',
            description: '에러 토스트입니다.',
          })
        }
      >
        토스트 띄우기
      </Button>
    );
  },
};
