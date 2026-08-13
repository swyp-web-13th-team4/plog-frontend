import { Field, Icon } from '@plog/ui';

import { SelectTriggerButton } from '@/features/select-trigger-button';
import { WorkDateDialog } from '@/features/select-work-date';
import { WorkTimeDialog } from '@/features/select-work-time';

import { formatDate, formatTime } from '@/shared/lib/datetime';

import { type LogFormController } from '../model/use-create-log-page';

type LogWorkSessionFieldsProps = {
  controller: LogFormController;
};

export default function LogWorkSessionFields({
  controller,
}: LogWorkSessionFieldsProps) {
  const { endTime, focusTargets, setFormValue, startTime, trigger, workDate } =
    controller;
  const {
    endTimeButtonRef,
    startTimeButtonRef,
    workDateButtonRef,
    workDateFieldRef,
    workTimeFieldRef,
  } = focusTargets;

  return (
    <div className="flex flex-col gap-3">
      <div ref={workDateFieldRef}>
        <Field label="작업 날짜" required>
          <WorkDateDialog
            value={workDate}
            onChange={(value) => {
              setFormValue('studyDate', value);
            }}
          >
            <SelectTriggerButton
              ref={workDateButtonRef}
              value={workDate ? formatDate(workDate, 'dot') : null}
              placeholder="YYYY.MM.DD"
              icon={
                <Icon
                  name="calendar"
                  size={20}
                  className="text-semantic-object-subtle"
                />
              }
              aria-label="작업 날짜 선택"
            />
          </WorkDateDialog>
        </Field>
      </div>
      <div ref={workTimeFieldRef} className="grid grid-cols-2 gap-4">
        <Field label="시작 시간" required>
          <WorkTimeDialog
            value={startTime}
            onChange={(value) => {
              setFormValue('startedAt', value);
              void trigger('endedAt');
            }}
            label="시작 시간"
            name="startTime"
          >
            <SelectTriggerButton
              ref={startTimeButtonRef}
              value={startTime ? formatTime(startTime, 'ko') : null}
              placeholder="--:--"
              icon={
                <Icon
                  name="clock"
                  size={20}
                  className="text-semantic-object-subtle"
                />
              }
              aria-label="시작 시간 선택"
            />
          </WorkTimeDialog>
        </Field>
        <Field label="종료 시간" required>
          <WorkTimeDialog
            value={endTime}
            onChange={(value) => {
              setFormValue('endedAt', value);
            }}
            label="종료 시간"
            name="endTime"
          >
            <SelectTriggerButton
              ref={endTimeButtonRef}
              value={endTime ? formatTime(endTime, 'ko') : null}
              placeholder="--:--"
              icon={
                <Icon
                  name="clock"
                  size={20}
                  className="text-semantic-object-subtle"
                />
              }
              aria-label="종료 시간 선택"
            />
          </WorkTimeDialog>
        </Field>
      </div>
    </div>
  );
}
