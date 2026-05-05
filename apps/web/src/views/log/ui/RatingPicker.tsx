import FocusLevelDefault1 from '@/shared/assets/focus-levels/focus-level-default-1.svg';
import FocusLevelDefault2 from '@/shared/assets/focus-levels/focus-level-default-2.svg';
import FocusLevelDefault3 from '@/shared/assets/focus-levels/focus-level-default-3.svg';
import FocusLevelDefault4 from '@/shared/assets/focus-levels/focus-level-default-4.svg';
import FocusLevelDefault5 from '@/shared/assets/focus-levels/focus-level-default-5.svg';
import FocusLevelSelect1 from '@/shared/assets/focus-levels/focus-level-select-1.svg';
import FocusLevelSelect2 from '@/shared/assets/focus-levels/focus-level-select-2.svg';
import FocusLevelSelect3 from '@/shared/assets/focus-levels/focus-level-select-3.svg';
import FocusLevelSelect4 from '@/shared/assets/focus-levels/focus-level-select-4.svg';
import FocusLevelSelect5 from '@/shared/assets/focus-levels/focus-level-select-5.svg';

export type FocusLevel = 1 | 2 | 3 | 4 | 5;

const FOCUS_LEVEL_OPTIONS = [
  {
    value: 1,
    label: '매우 낮음',
    DefaultIcon: FocusLevelDefault1,
    SelectedIcon: FocusLevelSelect1,
  },
  {
    value: 2,
    label: '낮음',
    DefaultIcon: FocusLevelDefault2,
    SelectedIcon: FocusLevelSelect2,
  },
  {
    value: 3,
    label: '보통',
    DefaultIcon: FocusLevelDefault3,
    SelectedIcon: FocusLevelSelect3,
  },
  {
    value: 4,
    label: '높음',
    DefaultIcon: FocusLevelDefault4,
    SelectedIcon: FocusLevelSelect4,
  },
  {
    value: 5,
    label: '매우 높음',
    DefaultIcon: FocusLevelDefault5,
    SelectedIcon: FocusLevelSelect5,
  },
] as const;

type RatingPickerProps = {
  value: FocusLevel | null;
  onChange: (score: FocusLevel) => void;
};

export default function RatingPicker({ value, onChange }: RatingPickerProps) {
  return (
    <div className="grid w-full grid-cols-5 gap-2">
      {FOCUS_LEVEL_OPTIONS.map(
        ({ value: score, label, DefaultIcon, SelectedIcon }) => {
          const isSelected = value === score;
          const RatingIcon = isSelected ? SelectedIcon : DefaultIcon;
          return (
            <label
              key={score}
              className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-visible rounded-sm transition outline-none focus-within:ring-2 focus-within:ring-semantic-accent-normal focus-within:ring-offset-2 focus-within:ring-offset-semantic-bg-standard"
            >
              <input
                type="radio"
                name="focusScore"
                value={score}
                checked={isSelected}
                onChange={() => onChange(score)}
                className="sr-only"
                aria-label={`집중도 ${score}점, ${label}`}
              />
              <RatingIcon
                aria-hidden="true"
                className="block size-full scale-140"
              />
            </label>
          );
        },
      )}
    </div>
  );
}
