import { Table } from '@components/user';
import { API_CLIENT } from '@lib/constant/api';
import InsertCookieInRequest from '@lib/util/insert-cookie-in-request';
import { customFetch } from '@swifty/shared-lib';
import type { UserApi } from '@type/user';

import styles from './user.module.css';

export default async function Page() {
  const requestOption = await InsertCookieInRequest({
    cache: 'no-cache',
  });

  const data = await customFetch<UserApi>(API_CLIENT.users(), requestOption);
  return (
    <main>
      <h2 className={styles.heading}>계정 관리</h2>
      <Table data={data.content} pageSize={data.size} total={data.totalPages} />
    </main>
  );
}
