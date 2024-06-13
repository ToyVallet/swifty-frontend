import { DrawerButton } from '@components/ui';
import { UniversityCreateForm } from '@components/university';
import { Table } from '@components/user';
import { API_CLIENT } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { Paginaiton } from '@type/api';
import type { User } from '@type/user';

import styles from './user.module.css';

export default async function Page() {
  const data = await customFetch<Paginaiton<User>>(API_CLIENT.users(), {
    cache: 'no-cache',
    next: { tags: ['users'] },
    credentials: 'include',
  });
  return (
    <main>
      <div className={styles.header}>
        <h2 className={styles.heading}>계정 관리</h2>
        <DrawerButton variant="university-create">
          <UniversityCreateForm />
        </DrawerButton>
      </div>

      <Table data={data.content} pageSize={data.size} total={data.totalPages} />
    </main>
  );
}
