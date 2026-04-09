import type { ReactNode } from 'react';

export function CodeBadge({ children }: { children: ReactNode }) {
  return (
    <code className="caption-md rounded border border-semantic-accent-subtle bg-semantic-accent-subtlest px-2 py-0.5 text-semantic-accent-bold">
      {children}
    </code>
  );
}

export function TableContainer({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-sm border border-semantic-accent-subtle">
      {children}
    </div>
  );
}

export function TableHeader({
  columns,
  gridCols,
}: {
  columns: string[];
  gridCols: string;
}) {
  return (
    <div
      className="grid items-stretch gap-0 border-b border-semantic-accent-subtle bg-semantic-accent-subtlest"
      style={{ gridTemplateColumns: gridCols }}
    >
      {columns.map((col, i) => (
        <div
          key={col}
          className={`label-sm flex items-center px-4 py-2 text-semantic-accent-bolder ${i < columns.length - 1 ? 'border-r border-semantic-accent-subtle' : ''}`}
        >
          {col}
        </div>
      ))}
    </div>
  );
}

export function TableRow({
  index,
  gridCols,
  children,
}: {
  index: number;
  gridCols: string;
  children: ReactNode;
}) {
  const rowBg =
    index % 2 === 0 ? 'bg-semantic-bg-standard' : 'bg-semantic-accent-subtlest';
  return (
    <div
      className={`grid items-stretch gap-0 ${rowBg}`}
      style={{ gridTemplateColumns: gridCols }}
    >
      {children}
    </div>
  );
}

export function TableCell({
  children,
  noPadding = false,
}: {
  children: ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div
      className={`caption-md flex min-w-0 overflow-hidden ${noPadding ? '' : 'items-center px-4 py-3'}`}
    >
      {children}
    </div>
  );
}
