import { API_CLIENT } from '@app/lib/constant/api';
import insertCookieInRequest from '@app/lib/util/insert-cookie-in-request';
import type { BreadcrumbList } from '@components/ui';
import { BreadCrumbs } from '@components/ui';
import { customFetch } from '@swifty/shared-lib';
import type { User } from '@type/user';

import styles from './user-detail.module.css';

interface Props {
  params: { id: string };
}

export default async function UserDetailPage({ params: { id } }: Props) {
  const requestOption = await insertCookieInRequest({});
  const data = await customFetch<User>(API_CLIENT.user(id), requestOption);

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
    </main>
  );
}
