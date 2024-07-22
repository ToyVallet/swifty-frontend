import { Table } from '@components';
import { type Pageable, http } from '@swifty/shared-lib';
import type { User } from '@type';

import styles from './user.module.css';

export default async function Page() {
  const data = await http.get<Pageable<User>>('/root/admin/user', {
    query: {},
    credentials: 'include',
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
