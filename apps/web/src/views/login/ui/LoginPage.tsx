import { KAKAO_LOGIN_URL } from '@/shared/api/constants';
import LogoSVG from '@/shared/assets/brand/logo-with-slogan.svg';
import KakaoIcon from '@/shared/assets/icons/kakao.svg';
import LoginIllustration from '@/shared/assets/images/login-illustration.svg';

function Separator() {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className="inline-block h-3 border-l border-l-semantic-stroke-subtle"
    />
  );
}

export default function LoginPage() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-10">
      <LogoSVG className="mobile:h-auto mobile:w-54" />
      <div className="size-100 shrink-0 mobile:size-75">
        <LoginIllustration className="h-full w-full" />
      </div>
      <a
        href={KAKAO_LOGIN_URL}
        className="flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] font-sans text-[15px] font-semibold text-semantic-system-black/85"
      >
        <KakaoIcon aria-hidden />
        카카오로 시작하기
      </a>
      <div className="caption-md absolute bottom-10 flex items-center gap-1.5 self-center text-semantic-object-normal">
        <a href="/terms/privacy" className="underline-offset-2 hover:underline">
          개인정보 처리방침
        </a>
        <Separator />
        <a href="/terms/service" className="underline-offset-2 hover:underline">
          서비스 이용약관
        </a>
        <Separator />
        <a
          href="/terms/geolocation"
          className="underline-offset-2 hover:underline"
        >
          위치정보 이용약관
        </a>
      </div>
    </div>
  );
}
