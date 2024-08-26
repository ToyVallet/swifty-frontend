import { LoginForm } from '@components';
import { Icon } from '@swifty/assets';

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[74px]">
      <header className="flex flex-col justify-center items-center gap-5 text-center">
        <Icon name="host-admin/swifty-logo" width={219} height={72} />
        <h3 className="text-16 font-bold">운영 어드민 포탈 로그인</h3>
      </header>
      <main className="w-[393px] flex flex-col justify-center items-center">
        <LoginForm />;
      </main>
    </div>
  );
}
