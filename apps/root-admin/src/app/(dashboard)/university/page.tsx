import {
  DrawerButton,
  UniversityCreateForm,
  UniversityTable,
} from '@components';
import { API_UNIVERSITY } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { Paginaiton, University } from '@type';

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
        total={data.totalElements}
      />
    </main>
  );
}
