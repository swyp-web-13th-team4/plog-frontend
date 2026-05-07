export type RecordTypeValue = 'latest' | 'like' | 'concentrate';
export type FeedViewType = 'list' | 'grid';

export type ToolbarConfig = {
  viewToggle?: boolean;
  tagFilter?: boolean;
};

export const RECORD_OPTION_ITEMS: { value: RecordTypeValue; label: string }[] =
  [
    { value: 'latest', label: '최신순' },
    { value: 'like', label: '좋아요순' },
    { value: 'concentrate', label: '집중도순' },
  ];
