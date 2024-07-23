import { BreadCrumbs, type BreadcrumbList, UserInfo } from '@components';
import type { Params } from '@swifty/shared-lib';
import { http } from '@swifty/shared-lib';
import type { User } from '@type';

import styles from './user-detail.module.css';

export default async function UserDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await http.get<User>('/root/admin/user/{id}', {
    params: { id },
    credentials: 'include',
  });

  const breadcrumbList: BreadcrumbList = [
    {
      title: 'User',
      path: '/user',
    },
    {
      title: data.loginId,
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
