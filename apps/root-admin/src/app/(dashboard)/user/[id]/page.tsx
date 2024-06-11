import { BreadCrumbs, type BreadcrumbList } from '@components/ui';
import { UserInfo } from '@components/user';
import { API_CLIENT } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { User } from '@type/user';

import styles from './user-detail.module.css';

interface Props {
  params: { id: string };
}

export default async function UserDetailPage({ params: { id } }: Props) {
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
