import { type ReactNode, useId } from 'react';

import { cn } from '@plog/utils';

type EmptyStateProps = {
  title: string;
  description?: string;
  graphic?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

function EmptyState({
  title,
  description,
  graphic,
  actions,
  className,
}: EmptyStateProps) {
  const titleId = useId();

  return (
    <div
      aria-labelledby={titleId}
      className={cn(
        'flex flex-col items-center gap-2.5 text-center',
        className,
      )}
    >
      {graphic && (
        <div
          aria-hidden="true"
          className="[&_svg]:size-15 [&_svg]:fill-semantic-object-normal"
        >
          {graphic}
        </div>
      )}
      <div className="flex flex-col items-center gap-1.5">
        <h2 id={titleId} className="label-lg text-semantic-object-bold">
          {title}
        </h2>
        {description && (
          <p className="body-sm line-clamp-3 whitespace-pre-line text-semantic-object-normal">
            {description}
          </p>
        )}
      </div>
      {actions}
    </div>
  );
}

export default EmptyState;
