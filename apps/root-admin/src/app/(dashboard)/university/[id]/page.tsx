import type { Params } from '@swifty/shared-lib';

export default async function UniversityDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  return <div>{id}</div>;
}
