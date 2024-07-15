import { Main } from '@components/common';
import { LoginForm } from '@components/login';
import Logo from '@images/swifty-text-logo.svg';

export default function LoginPage() {
  return (
    <Main>
      <Logo className="mt-20 mb-16" width={169} height={53} />
      <LoginForm />
    </Main>
  );
}
