import { KAKAO_LOGIN_URL } from '@/shared/api/constants';
import LogoSVG from '@/shared/assets/brand/logo.svg';
import SloganSVG from '@/shared/assets/brand/slogan.svg';
import KakaoIcon from '@/shared/assets/icons/kakao.svg';

export default function LoginPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center p-10">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <LogoSVG />
        <SloganSVG />
      </div>
      <div className="flex w-full flex-col gap-12 pb-2">
        <a
          href={KAKAO_LOGIN_URL}
          className="flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] font-sans text-[15px] font-semibold text-semantic-system-black/85"
        >
          <KakaoIcon aria-hidden />
          카카오로 시작하기
        </a>
        <div className="caption-md flex items-center gap-1.5 self-center text-semantic-object-normal">
          <a
            href="/terms/privacy"
            className="underline-offset-2 hover:underline"
          >
            개인정보 처리방침
          </a>
          <div
            role="separator"
            aria-hidden="true"
            className="inline-block h-3 border-l border-l-semantic-stroke-subtle"
          />
          <a
            href="/terms/service"
            className="underline-offset-2 hover:underline"
          >
            서비스 이용약관
          </a>
          <div
            role="separator"
            aria-hidden="true"
            className="inline-block h-3 border-l border-l-semantic-stroke-subtle"
          />
          <a
            href="/terms/geolocation"
            className="underline-offset-2 hover:underline"
          >
            위치정보 이용약관
          </a>
        </div>
      </div>
    </div>
  );
}
