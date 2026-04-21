import { useRef, useState } from 'react';

import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Button';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '화면 하단에서 슬라이드 형태로 올라오는 컴포넌트입니다. 추가 정보를 제공하거나 액션을 수행할 때 사용됩니다.',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description /> <Primary />
          <Stories />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

const DEFAULT_CODE = `\
<BottomSheet>
  <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
  <BottomSheet.Content>
    <BottomSheet.Handle />
    <BottomSheet.Header>
      <BottomSheet.Title>타이틀</BottomSheet.Title>
    </BottomSheet.Header>
    <BottomSheet.Body>
      <p className="body-md mb-3 text-semantic-object-normal">
        하단 시트 본문 텍스트입니다.
      </p>
      <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
    </BottomSheet.Body>
  </BottomSheet.Content>
</BottomSheet>`;

const WITHOUT_HANDLE_CODE = `\
<BottomSheet>
  <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
  <BottomSheet.Content>
    <BottomSheet.Header>
      <BottomSheet.Title>핸들 없음</BottomSheet.Title>
      <BottomSheet.CloseButton />
    </BottomSheet.Header>
    <BottomSheet.Body>
      <p className="body-md mb-3 text-semantic-object-normal">
        핸들 없이 닫기 버튼만으로 닫는 하단 시트입니다.
      </p>
      <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
    </BottomSheet.Body>
  </BottomSheet.Content>
</BottomSheet>`;

const CONTROLLED_CODE = `\
const [open, setOpen] = useState(false);

return (
  <>
    <Button onClick={() => setOpen(true)}>하단 시트 열기</Button>
    <BottomSheet open={open} onOpenChange={setOpen}>
      <BottomSheet.Content>
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>열림 상태 제어</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <p className="body-md mb-3 text-semantic-object-normal">
            외부 상태로 열림을 제어하는 하단 시트입니다.
          </p>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  </>
);`;

const DETACHED_TRIGGER_CODE = `\
const handle = BottomSheet.createHandle();

return (
  <div className="flex flex-col items-start gap-3">
    <BottomSheet.Trigger handle={handle} render={<Button>하단 시트 열기</Button>} />

    <BottomSheet handle={handle}>
      <BottomSheet.Content>
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>분리된 트리거</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <p className="body-md mb-3 text-semantic-object-normal">
            BottomSheet 바깥의 트리거로 열린 하단 시트입니다.
          </p>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  </div>
);`;

const FOCUS_CONTROL_CODE = `\
const inputRef = useRef<HTMLInputElement>(null);
const returnButtonRef = useRef<HTMLButtonElement>(null);

return (
  <div className="flex flex-col items-start gap-3">
    <BottomSheet>
      <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
      <BottomSheet.Content initialFocus={inputRef} finalFocus={returnButtonRef}>
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>포커스 제어</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <Field className="mb-3">
            <Input ref={inputRef} placeholder="초기 포커스가 여기로 이동합니다" />
          </Field>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
    <Button ref={returnButtonRef} variant="secondary">
      닫힌 후 포커스가 여기로 돌아옵니다
    </Button>
  </div>
);`;

const WITHOUT_BACKDROP_CODE = `\
<BottomSheet modal={false}>
  <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
  <BottomSheet.Content backdrop={false}>
    <BottomSheet.Handle />
    <BottomSheet.Header>
      <BottomSheet.Title>백드롭 없음</BottomSheet.Title>
    </BottomSheet.Header>
    <BottomSheet.Body>
      <p className="body-md mb-3 text-semantic-object-normal">
        백드롭 없이 사용하는 하단 시트입니다.
      </p>
      <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
    </BottomSheet.Body>
  </BottomSheet.Content>
</BottomSheet>`;

const SNAP_POINTS_CODE = `\
const snapPoints = [0.5, 1];

return (
  <BottomSheet snapPoints={snapPoints}>
    <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
    <BottomSheet.Content>
      <BottomSheet.Handle />
      <BottomSheet.Header>
        <BottomSheet.Title>스냅 포인트</BottomSheet.Title>
      </BottomSheet.Header>
      <BottomSheet.Body className="min-h-0 overflow-y-auto overscroll-contain">
        {Array.from({ length: 30 }, (_, i) => (
          <p
            key={i}
            className="body-md border-b border-semantic-object-subtler px-1 py-4 text-semantic-object-normal last:border-0"
          >
            항목 {i + 1}
          </p>
        ))}
      </BottomSheet.Body>
    </BottomSheet.Content>
  </BottomSheet>
);`;

const detachedHandle = BottomSheet.createHandle();

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: DEFAULT_CODE },
    },
  },
  render: () => (
    <BottomSheet>
      <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
      <BottomSheet.Content>
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>타이틀</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <p className="body-md mb-3 text-semantic-object-normal">
            하단 시트 본문 텍스트입니다.
          </p>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  ),
};

export const WithoutHandle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`BottomSheet.Handle`을 포함하지 않으면 핸들 바가 표시되지 않습니다. 닫기 버튼을 함께 제공하는 것을 권장합니다.',
      },
      source: { code: WITHOUT_HANDLE_CODE },
    },
  },
  render: () => (
    <BottomSheet>
      <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
      <BottomSheet.Content>
        <BottomSheet.Header>
          <BottomSheet.Title>핸들 없음</BottomSheet.Title>
          <BottomSheet.CloseButton />
        </BottomSheet.Header>
        <BottomSheet.Body>
          <p className="body-md mb-3 text-semantic-object-normal">
            핸들 없이 닫기 버튼만으로 닫는 하단 시트입니다.
          </p>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`open`과 `onOpenChange`를 사용해 하단 시트의 열림 상태를 외부에서 직접 제어합니다. `BottomSheet.Trigger` 없이도 프로그래밍 방식으로 하단 시트를 열 수 있습니다.',
      },
      source: { code: CONTROLLED_CODE },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>하단 시트 열기</Button>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Content>
            <BottomSheet.Handle />
            <BottomSheet.Header>
              <BottomSheet.Title>열림 상태 제어</BottomSheet.Title>
            </BottomSheet.Header>
            <BottomSheet.Body>
              <p className="body-md mb-3 text-semantic-object-normal">
                외부 상태로 열림을 제어하는 하단 시트입니다.
              </p>
              <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
            </BottomSheet.Body>
          </BottomSheet.Content>
        </BottomSheet>
      </>
    );
  },
};

export const FocusControl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`initialFocus`로 하단 시트가 열릴 때 포커스를 받을 요소를, `finalFocus`로 닫힐 때 포커스가 돌아갈 요소를 지정합니다.',
      },
      source: { code: FOCUS_CONTROL_CODE },
    },
  },
  render: function Render() {
    const inputRef = useRef<HTMLInputElement>(null);
    const returnButtonRef = useRef<HTMLButtonElement>(null);
    return (
      <div className="flex flex-col items-start gap-3">
        <BottomSheet>
          <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
          <BottomSheet.Content
            initialFocus={inputRef}
            finalFocus={returnButtonRef}
          >
            <BottomSheet.Handle />
            <BottomSheet.Header>
              <BottomSheet.Title>포커스 제어</BottomSheet.Title>
            </BottomSheet.Header>
            <BottomSheet.Body>
              <Field className="mb-3">
                <Input
                  ref={inputRef}
                  placeholder="초기 포커스가 여기로 이동합니다"
                />
              </Field>
              <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
            </BottomSheet.Body>
          </BottomSheet.Content>
        </BottomSheet>
        <Button ref={returnButtonRef} variant="secondary">
          닫힌 후 포커스가 여기로 돌아옵니다
        </Button>
      </div>
    );
  },
};

export const WithoutBackdrop: Story = {
  name: 'Without Backdrop (Non Modal)',
  parameters: {
    docs: {
      description: {
        story:
          '`backdrop={false}`를 설정하면 백드롭 없이 하단 시트를 사용할 수 있습니다. 루트에 `modal={false}`를 함께 설정해 포커스 트래핑과 스크롤 잠금을 해제할 수 있습니다.',
      },
      source: { code: WITHOUT_BACKDROP_CODE },
    },
  },
  render: () => (
    <BottomSheet modal={false}>
      <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
      <BottomSheet.Content backdrop={false}>
        <BottomSheet.Handle />
        <BottomSheet.Header>
          <BottomSheet.Title>백드롭 없음</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <p className="body-md mb-3 text-semantic-object-normal">
            백드롭 없이 사용하는 하단 시트입니다.
          </p>
          <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
        </BottomSheet.Body>
      </BottomSheet.Content>
    </BottomSheet>
  ),
};

export const SnapPoints: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`snapPoints`로 시트의 고정 높이를 지정합니다. 값은 뷰포트 높이 비율(`0`–`1`), 픽셀 단위 숫자(`1`보다 큰 숫자), 또는 `px` 및 `rem` 문자열로 설정할 수 있습니다. `snapPoint`와 `onSnapPointChange`로 현재 스냅 위치를 제어할 수 있습니다.',
      },
      source: { code: SNAP_POINTS_CODE },
    },
  },
  render: function Render() {
    const snapPoints = [0.5, 1];
    return (
      <BottomSheet snapPoints={snapPoints}>
        <BottomSheet.Trigger render={<Button>하단 시트 열기</Button>} />
        <BottomSheet.Content>
          <BottomSheet.Handle />
          <BottomSheet.Header>
            <BottomSheet.Title>스냅 포인트</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body className="min-h-0 overflow-y-auto overscroll-contain">
            {Array.from({ length: 30 }, (_, i) => (
              <p
                key={i}
                className="body-md border-b border-semantic-object-subtler px-1 py-4 text-semantic-object-normal last:border-0"
              >
                항목 {i + 1}
              </p>
            ))}
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    );
  },
};

export const DetachedTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`BottomSheet.createHandle()`로 생성한 핸들을 `BottomSheet`와 `BottomSheet.Trigger`에 각각 전달하면, 두 컴포넌트가 서로 다른 위치에 있어도 연결할 수 있습니다.',
      },
      source: { code: DETACHED_TRIGGER_CODE },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <BottomSheet.Trigger
        handle={detachedHandle}
        render={<Button>하단 시트 열기</Button>}
      />
      <BottomSheet handle={detachedHandle}>
        <BottomSheet.Content>
          <BottomSheet.Handle />
          <BottomSheet.Header>
            <BottomSheet.Title>분리된 트리거</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <p className="body-md mb-3 text-semantic-object-normal">
              BottomSheet 바깥의 트리거로 열린 하단 시트입니다.
            </p>
            <BottomSheet.Close render={<Button fullWidth>확인</Button>} />
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  ),
};
