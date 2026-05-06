import { Fragment, useMemo } from 'react';

export default function HighlightText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const normalizedQuery = query.trim();

  const parts = useMemo(() => {
    if (!normalizedQuery) return [text];

    const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  }, [normalizedQuery, text]);

  return (
    <>
      {parts.map((part, index) => {
        const highlighted =
          normalizedQuery.length > 0 &&
          part.toLocaleLowerCase() === normalizedQuery.toLocaleLowerCase();

        return (
          <Fragment key={`${part}-${index}`}>
            {highlighted ? (
              <mark className="bg-transparent text-semantic-accent-normal">
                {part}
              </mark>
            ) : (
              part
            )}
          </Fragment>
        );
      })}
    </>
  );
}
