import { BreadCrumbs, type BreadcrumbList, UserInfo } from '@components';
import { API_CLIENT } from '@lib';
import type { Params } from '@swifty/shared-lib';
import { customFetch } from '@swifty/shared-lib';
import type { User } from '@type';

import styles from './user-detail.module.css';

export default async function UserDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await customFetch<User>(API_CLIENT.user(id), {
    cache: 'no-store',
    credentials: 'include',
  });

  const breadcrumbList: BreadcrumbList = [
    {
      title: 'User',
      path: '/user',
    },
    {
      title: data.userFormId,
    },
  ];
  return (
    <main>
      <div className={styles.heading}>
        <BreadCrumbs separator="/" breadcrumbList={breadcrumbList} />
      </div>
      <UserInfo {...data} />
    </main>
  );
}
