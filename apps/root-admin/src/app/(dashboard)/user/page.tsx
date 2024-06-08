import { Table } from '@components/user';
import { API_CLIENT } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { UserApi } from '@type/user';

import styles from './user.module.css';

export default async function Page() {
  const data = await customFetch<UserApi>(API_CLIENT.hosts(), {
    cache: 'no-cache',
  });
  return (
    <main>
      <h2 className={styles.heading}>계정 관리</h2>
      <Table data={data.content} pageSize={data.size} total={data.totalPages} />
    </main>
  );
}
