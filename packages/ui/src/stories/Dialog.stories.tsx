import type { Meta, StoryObj } from '@storybook/react';

import PictureIcon from '@/assets/picture.svg?react';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Field from '@/components/Field';
import Input from '@/components/Input';

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
      <Dialog.Title>타이틀</Dialog.Title>
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
      <Dialog.Title>타이틀</Dialog.Title>
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
      <Dialog.Title>타이틀</Dialog.Title>
      <Dialog.Description>주 버튼을 강조할 때 버튼을 세로로 배치합니다.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Actions layout="vertical">
      <Button fullWidth>확인</Button>
      <Dialog.Close render={<Button variant="outline" fullWidth>취소</Button>} />
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

const WITH_GRAPHIC_AND_BODY_CODE = `\
<Dialog>
  <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Graphic>
        <PictureIcon className="size-11" />
      </Dialog.Graphic>
      <Dialog.Title>타이틀 입력</Dialog.Title>
      <Dialog.Description>해당 다이얼로그의 설명을 적어주세요.</Dialog.Description>
    </Dialog.Header>
    <Dialog.Body>
      <Field>
        <Input placeholder="내용을 입력하세요" />
      </Field>
    </Dialog.Body>
    <Dialog.Actions layout="vertical">
      <Dialog.Close render={<Button fullWidth>확인</Button>} />
    </Dialog.Actions>
  </Dialog.Content>
</Dialog>`;

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
          <Dialog.Title>타이틀</Dialog.Title>
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
          <Dialog.Title>타이틀</Dialog.Title>
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
          <Dialog.Title>타이틀</Dialog.Title>
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

export const WithGraphicAndBody: Story = {
  parameters: {
    docs: {
      description: {
        story: '`Graphic`, `Body` 슬롯을 포함한 예제입니다.',
      },
      source: { code: WITH_GRAPHIC_AND_BODY_CODE },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button>다이얼로그 열기</Button>} />
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Graphic>
            <PictureIcon className="size-11" />
          </Dialog.Graphic>
          <Dialog.Title>타이틀 입력</Dialog.Title>
          <Dialog.Description>
            해당 다이얼로그의 설명을 적어주세요.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <Field>
            <Input placeholder="내용을 입력하세요" />
          </Field>
        </Dialog.Body>
        <Dialog.Actions layout="vertical">
          <Dialog.Close render={<Button fullWidth>확인</Button>} />
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>
  ),
};
