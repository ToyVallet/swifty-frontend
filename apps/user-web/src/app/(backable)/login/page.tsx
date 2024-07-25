import { Main } from '@components/common';
import { LoginForm } from '@components/login';
import { Icon } from '@swifty/assets';

export default function LoginPage() {
  return (
    <Main className="px-5">
      <Icon
        name="swifty-full-logo"
        className="mt-[159px] mb-[60px] fill-black dark:fill-white"
        height={53}
      />
      <LoginForm />
    </Main>
  );
}
