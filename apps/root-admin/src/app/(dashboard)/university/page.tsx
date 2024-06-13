import { DrawerButton } from '@components/ui';
import { UniversityCreateForm, UniversityTable } from '@components/university';
import { API_UNIVERSITY } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { Paginaiton } from '@type/api';
import type { University } from '@type/university';

import styles from './university.module.css';

export default async function UniversityPage() {
  const data = await customFetch<Paginaiton<University>>(
    API_UNIVERSITY.get_univiresity(),
    {
      method: 'GET',
      cache: 'no-cache',
      next: {
        tags: ['university'],
      },
    },
  );

  return (
    <main>
      <div className={styles.header}>
        <h2 className={styles.heading}>대학 관리</h2>
        <DrawerButton variant="university-create">
          <UniversityCreateForm />
        </DrawerButton>
      </div>
      <UniversityTable
        data={data.content}
        pageSize={data.size}
        total={data.totalPages}
      />
    </main>
  );
}
