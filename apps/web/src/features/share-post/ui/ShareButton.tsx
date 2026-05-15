'use client';

import { Icon, useToast } from '@plog/ui';

type ShareButtonProps = {
  postId: number;
};

export default function ShareButton({ postId }: ShareButtonProps) {
  const { toast } = useToast();

  const url = `${window.location.origin}/feed/${postId}`;

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      toast({
        type: 'error',
        description: '이 브라우저에서는 링크 복사를 지원하지 않습니다.',
      });
      return;
    }
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

  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }
    try {
      const shareData = { url };
      await navigator.share(shareData);
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === 'AbortError' || error.name === 'InvalidStateError')
      )
        return;
      toast({
        type: 'error',
        description: '공유에 실패했어요. 다시 시도해 주세요.',
      });
    }
  };

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center"
      onClick={handleShare}
    >
      <Icon name="share" className="text-semantic-object-normal" />
    </button>
  );
}
