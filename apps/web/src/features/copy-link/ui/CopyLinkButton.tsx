'use client';

import { Icon, useToast } from '@plog/ui';

type CopyLinkButtonProps = {
  postId: number;
};

export default function CopyLinkButton({ postId }: CopyLinkButtonProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    const url = `${window.location.origin}/feed/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        icon: <Icon name="link" />,
        description: '링크가 복사되었습니다.',
      });
    } catch {
      toast({
        type: 'error',
        description: '링크 복사에 실패했어요. 다시 시도해 주세요.',
      });
    }
  };

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center"
      onClick={handleCopy}
    >
      <Icon name="share" className="text-semantic-object-normal" />
    </button>
  );
}
