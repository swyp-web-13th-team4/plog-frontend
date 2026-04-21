import { useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';

import Dialog from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '서비스와 사용자 간의 대화를 위한 컴포넌트입니다. 확인, 취소, 선택 등의 액션을 수행할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DEFAULT_CODE = `\
<Dialog>
  <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>타이틀</Dialog.Title>
      <Dialog.Description>다이얼로그 설명 텍스트입니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Actions>
      <Dialog.Close render={<Button fullWidth>확인</Button>} />
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

const NON_DISMISSABLE_CODE = `\
<Dialog disablePointerDismissal>
  <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>닫기 비활성화</Dialog.Title>
      <Dialog.Description>배경을 클릭해도 닫히지 않습니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Actions>
      <Dialog.Close render={<Button fullWidth>확인</Button>} />
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

const HORIZONTAL_ACTIONS_CODE = `\
<Dialog>
  <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>가로 버튼 배치</Dialog.Title>
      <Dialog.Description>의사 결정이 필요할 때 버튼을 가로로 배치합니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Actions layout="horizontal">
      <Dialog.Close render={<Button variant="secondary" fullWidth>취소</Button>} />
      <Button fullWidth>확인</Button>
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

const VERTICAL_ACTIONS_CODE = `\
<Dialog>
  <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>세로 버튼 배치</Dialog.Title>
      <Dialog.Description>주 버튼을 강조할 때 버튼을 세로로 배치합니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Actions layout="vertical">
      <Button fullWidth>확인</Button>
      <Dialog.Close render={<Button variant="outline" fullWidth>취소</Button>} />
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

const CONTROLLED_CODE = `\
const [open, setOpen] = useState(false);

return (
  <>
    <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>열림 상태 제어</Dialog.Title>
          <Dialog.Description>외부 상태로 열림을 제어하는 다이얼로그입니다.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions>
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  </>
);`;

const DETACHED_TRIGGER_CODE = `\
const handle = Dialog.createHandle();

return (
  <div className="flex flex-col items-start gap-3">
    <Dialog.Trigger handle={handle} render={<Button>다이얼로그 열기</Button>} />

    <Dialog handle={handle}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>분리된 트리거</Dialog.Title>
          <Dialog.Description>Dialog.Root 바깥의 트리거로 열린 다이얼로그입니다.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions>
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  </div>
);`;

const FOCUS_CONTROL_CODE = `\
const inputRef = useRef<HTMLInputElement>(null);
const returnButtonRef = useRef<HTMLButtonElement>(null);

return (
  <div className="flex flex-col items-start gap-3">
    <Dialog>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content initialFocus={inputRef} finalFocus={returnButtonRef}>
        <Dialog.Header>
          <Dialog.Title>포커스 제어</Dialog.Title>
          <Dialog.Description>열릴 때 입력 필드로, 닫힐 때 아래 버튼으로 포커스가 이동합니다.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <Field>
            <Input ref={inputRef} placeholder="초기 포커스가 여기로 이동합니다" />
          </Field>
        </Dialog.Body>
        <Dialog.Actions>
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
    <Button ref={returnButtonRef} variant="secondary">
      닫힌 후 포커스가 여기로 돌아옵니다
    </Button>
  </div>
);`;

const detachedHandle = Dialog.createHandle();

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: DEFAULT_CODE },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>타이틀</Dialog.Title>
          <Dialog.Description>다이얼로그 설명 텍스트입니다.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions>
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  ),
};

export const NonDismissable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`disablePointerDismissal`을 설정하면 `Backdrop`을 클릭해도 닫히지 않습니다.',
      },
      source: { code: NON_DISMISSABLE_CODE },
    },
  },
  render: () => (
    <Dialog disablePointerDismissal>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>닫기 비활성화</Dialog.Title>
          <Dialog.Description>
            배경을 클릭해도 닫히지 않습니다.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions>
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  ),
};

export const HorizontalActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '액션 버튼을 가로로 배치합니다. 일반적인 의사 결정이 필요한 경우에 사용합니다.',
      },
      source: { code: HORIZONTAL_ACTIONS_CODE },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>가로 버튼 배치</Dialog.Title>
          <Dialog.Description>
            의사 결정이 필요할 때 버튼을 가로로 배치합니다.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions layout="horizontal">
          <Dialog.Close
            render={
              <Button variant="secondary" fullWidth>
                취소
              </Button>
            }
          />
          <Button fullWidth>확인</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  ),
};

export const VerticalActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '액션 버튼을 세로로 배치합니다. 버튼 내 텍스트가 길어지거나, 주 버튼을 시각적으로 강조할 때 사용합니다.',
      },
      source: { code: VERTICAL_ACTIONS_CODE },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>세로 버튼 배치</Dialog.Title>
          <Dialog.Description>
            주 버튼을 강조할 때 버튼을 세로로 배치합니다.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Actions layout="vertical">
          <Button fullWidth>확인</Button>
          <Dialog.Close
            render={
              <Button variant="outline" fullWidth>
                취소
              </Button>
            }
          />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  ),
};

function ControlledStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>열림 상태 제어</Dialog.Title>
            <Dialog.Description>
              외부 상태로 열림을 제어하는 다이얼로그입니다.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Actions>
            <Dialog.Close render={<Button fullWidth>확인</Button>} />
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`open`과 `onOpenChange`를 사용해 다이얼로그의 열림 상태를 외부에서 직접 제어합니다. `Dialog.Trigger` 없이도 프로그래밍 방식으로 다이얼로그를 열 수 있습니다.',
      },
      source: { code: CONTROLLED_CODE },
    },
  },
  render: () => <ControlledStory />,
};

function FocusControlStory() {
  const inputRef = useRef<HTMLInputElement>(null);
  const returnButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col items-start gap-3">
      <Dialog>
        <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
        <Dialog.Content initialFocus={inputRef} finalFocus={returnButtonRef}>
          <Dialog.Header>
            <Dialog.Title>포커스 제어</Dialog.Title>
            <Dialog.Description>
              열릴 때 입력 필드로, 닫힐 때 아래 버튼으로 포커스가 이동합니다.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Field>
              <Input
                ref={inputRef}
                placeholder="초기 포커스가 여기로 이동합니다"
              />
            </Field>
          </Dialog.Body>
          <Dialog.Actions>
            <Dialog.Close render={<Button fullWidth>확인</Button>} />
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
      <Button ref={returnButtonRef} variant="secondary">
        닫힌 후 포커스가 여기로 돌아옵니다
      </Button>
    </div>
  );
}

export const FocusControl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`initialFocus`로 다이얼로그가 열릴 때 포커스를 받을 요소를, `finalFocus`로 닫힐 때 포커스가 돌아갈 요소를 지정합니다.',
      },
      source: { code: FOCUS_CONTROL_CODE },
    },
  },
  render: () => <FocusControlStory />,
};

export const DetachedTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`Dialog.createHandle()`로 생성한 핸들을 `Dialog.Root`와 `Dialog.Trigger`에 각각 전달하면, 두 컴포넌트가 서로 다른 위치에 있어도 연결할 수 있습니다.',
      },
      source: { code: DETACHED_TRIGGER_CODE },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Dialog.Trigger
        handle={detachedHandle}
        render={<Button>다이얼로그 열기</Button>}
      />
      <Dialog handle={detachedHandle}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>분리된 트리거</Dialog.Title>
            <Dialog.Description>
              Dialog.Root 바깥의 트리거로 열린 다이얼로그입니다.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Actions>
            <Dialog.Close render={<Button fullWidth>확인</Button>} />
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </div>
  ),
};
