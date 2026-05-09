import { useRouter } from 'next/navigation';

import { useToast } from '@plog/ui';
import { useMutation } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client-api';

export function useDeleteAccountMutation() {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationFn: () => clientApi.delete<string>('/members/me'),
    onSuccess: () => {
      toast({ type: 'success', description: '탈퇴가 완료되었어요.' });
      router.push('/login');
    },
    onError: () => {
      toast({
        type: 'error',
        description: '오류가 발생했어요. 다시 시도해 주세요.',
      });
    },
  });
}
