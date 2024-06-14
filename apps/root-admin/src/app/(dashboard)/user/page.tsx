import { Table } from '@components';
import { API_CLIENT } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { Paginaiton, User } from '@type';

import styles from './user.module.css';

export default async function Page() {
  const data = await customFetch<Paginaiton<User>>(API_CLIENT.users(), {
    cache: 'no-cache',
    next: { tags: ['users'] },
  });
  return (
    <main>
      <h2 className={styles.heading}>계정 관리</h2>
      <Table
        data={data.content}
        pageSize={data.size}
        total={data.totalElements}
      />
    </main>
  );
}
