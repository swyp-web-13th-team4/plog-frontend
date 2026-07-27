import { type LogFormController } from '../model/use-create-log-page';
import LogWorkDateField from './LogWorkDateField';
import LogWorkTimeField from './LogWorkTimeField';

type LogWorkSessionFieldsProps = {
  controller: LogFormController;
};

export default function LogWorkSection({
  controller,
}: LogWorkSessionFieldsProps) {
  const { focusTargets } = controller;
  const {
    endTimeButtonRef,
    startTimeButtonRef,
    workDateButtonRef,
    workDateFieldRef,
    workTimeFieldRef,
  } = focusTargets;

  return (
    <div className="flex flex-col gap-3">
      <LogWorkDateField
        buttonRef={workDateButtonRef}
        inputRef={workDateFieldRef}
      />
      <div ref={workTimeFieldRef} className="grid grid-cols-2 gap-4">
        <LogWorkTimeField
          name="startedAt"
          label="시작 시간"
          buttonRef={startTimeButtonRef}
          revalidateField="endedAt"
        />
        <LogWorkTimeField
          name="endedAt"
          label="종료 시간"
          buttonRef={endTimeButtonRef}
        />
      </div>
    </div>
  );
}
