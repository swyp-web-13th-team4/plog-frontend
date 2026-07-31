import { useRouter } from 'next/navigation';

import * as amplitude from '@amplitude/unified';
import { useToast } from '@plog/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientApi } from '@/shared/api/client-api';
import { dialog } from '@/shared/lib/dialog';

import { type WithdrawReason } from './constants';

type DeleteAccountVariables = {
  reason: WithdrawReason;
  etcDetail: string;
};

export function useDeleteAccountMutation() {
  const router = useRouter();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: DeleteAccountVariables) => {
      await clientApi.delete<string>('/members/me');
      return variables;
    },
    onSuccess: async ({ reason, etcDetail }) => {
      amplitude.track('account_deleted', {
        reason,
        ...(etcDetail && { reason_detail: etcDetail }),
      });

      await dialog.alert({
        message: '탈퇴가 완료되었어요.',
        description:
          '지금까지 플로그를 이용해 주셔서 감사합니다.\n더 좋은 서비스를 준비하고 있을게요!',
      });

      queryClient.clear();
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
