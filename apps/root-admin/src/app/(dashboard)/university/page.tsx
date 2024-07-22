import {
  DrawerButton,
  RefetchButton,
  UniversityCreateForm,
  UniversityTable,
} from '@components';
import { http } from '@swifty/shared-lib';
import type { Paginaiton, University } from '@type';

import styles from './university.module.css';

export default async function UniversityPage() {
  const data = await http.get<Paginaiton<University>>(
    '/root/admin/university',
    {
      query: {
        page: '0',
      },
      credentials: 'include',
    },
  );

  return (
    <main>
      <div className={styles.header}>
        <h2 className={styles.heading}>대학 관리</h2>
        <div className={styles.buttonContainer}>
          <RefetchButton />
          <DrawerButton variant="university-create">
            <UniversityCreateForm />
          </DrawerButton>
        </div>
      </div>
      <UniversityTable
        data={data.content}
        pageSize={data.size}
        total={data.totalElements}
      />
    </main>
  );
}
