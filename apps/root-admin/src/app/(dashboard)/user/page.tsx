import { customFetch } from '@swifty/shared-lib';

export default async function Page() {
  const data = await customFetch('/admin/host', {
    credentials: 'include',
  });
  return <div></div>;
}
