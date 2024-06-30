import { LoginForm } from '@components/login';
import Logo from '@images/swifty-text-logo.svg';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-start w-full">
      <Logo className="mt-20 mb-16" width={169} height={53} />
      <LoginForm />
    </main>
  );
}
