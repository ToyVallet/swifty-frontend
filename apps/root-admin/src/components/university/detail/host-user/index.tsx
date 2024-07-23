import {
  DrawerButton,
  HostUserTable,
  UniversityHostCreateForm,
} from '@components';
import { http } from '@swifty/shared-lib';
import type { UniversityHostUser } from '@type';

import styles from './host-user.module.css';

export default async function UniversityHostUsers({ id }: { id: string }) {
  const data = await http.get<UniversityHostUser[]>('/root/admin/host/{id}', {
    params: { id },
    credentials: 'include',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>호스트 유저</h1>
        <DrawerButton variant="host-create">
          <UniversityHostCreateForm id={id} />
        </DrawerButton>
      </div>
      <HostUserTable data={data} />
    </div>
  );
}
