import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cn } from '@plog/utils';

import TabItem, {
  tabItemDisabledClassName,
  tabItemSelectedClassName,
} from '@/components/Tab/TabItem';

const TAB_ITEM_MIN_WIDTH_PX = 91;
const MAX_VISIBLE_TABS = 4;

type TabGroupItem = {
  value: string;
  showIcon?: boolean;
  disabled?: boolean;
  label: ReactNode;
  icon?: ReactNode;
  panel?: ReactNode;
  keepMounted?: boolean;
};

type TabGroupProps = Omit<
  ComponentPropsWithoutRef<typeof BaseTabs.Root>,
  'children' | 'defaultValue' | 'onValueChange' | 'value'
> & {
  items: TabGroupItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  listClassName?: string;
  itemClassName?: string;
  panelClassName?: string;
  keepMounted?: boolean;
};

function TabGroup({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  listClassName,
  itemClassName,
  panelClassName,
  keepMounted = false,
  ...props
}: TabGroupProps) {
  const fallbackValue = items.find((item) => !item.disabled)?.value ?? null;
  const resolvedDefaultValue =
    value === undefined ? (defaultValue ?? fallbackValue) : undefined;
  const hasPanels = items.some((item) => item.panel !== undefined);
  const tabWidth =
    items.length > 0
      ? items.length <= MAX_VISIBLE_TABS
        ? `max(calc(100% / ${items.length}), ${TAB_ITEM_MIN_WIDTH_PX}px)`
        : `max(calc(100% / ${MAX_VISIBLE_TABS}), ${TAB_ITEM_MIN_WIDTH_PX}px)`
      : undefined;

  return (
    <BaseTabs.Root
      value={value}
      defaultValue={resolvedDefaultValue}
      onValueChange={(nextValue) => onValueChange?.(String(nextValue))}
      className={cn('w-full', className)}
      {...props}
    >
      <BaseTabs.List
        className={cn(
          'flex w-full items-stretch overflow-x-auto overflow-y-hidden',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          listClassName,
        )}
      >
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            render={
              <TabItem
                label={item.label}
                icon={item.icon}
                showIcon={item.showIcon}
              />
            }
            className={(state) =>
              cn(
                'flex-none justify-center',
                state.active && tabItemSelectedClassName,
                state.disabled && tabItemDisabledClassName,
                itemClassName,
              )
            }
            style={tabWidth ? { width: tabWidth } : undefined}
          />
        ))}
      </BaseTabs.List>

      {hasPanels
        ? items.map((item) =>
            item.panel !== undefined ? (
              <BaseTabs.Panel
                key={item.value}
                value={item.value}
                keepMounted={item.keepMounted ?? keepMounted}
                className={panelClassName}
              >
                {item.panel}
              </BaseTabs.Panel>
            ) : null,
          )
        : null}
    </BaseTabs.Root>
  );
}

export type { TabGroupItem, TabGroupProps };
export default TabGroup;
