import { Icon, useToast } from '@plog/ui';

export default function CopyLinkButton() {
  const { toast } = useToast();
  //Todo: 해당 postId를 매개변수로 전달하여 링크 공유되는 로직 설계
  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={() =>
        toast({
          icon: <Icon name="link" />,
          description: '링크가 복사되었습니다.',
        })
      }
    >
      <Icon name="share" className="text-semantic-object-normal" />
    </button>
  );
}
