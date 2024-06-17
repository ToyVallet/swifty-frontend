import {
  DrawerButton,
  HostUserTable,
  UniversityHostCreateForm,
} from '@components';
import { API_HSOT, FETCH_TAG } from '@lib';
import { customFetch } from '@swifty/shared-lib';
import type { UniversityHostUser } from '@type';

import styles from './host-user.module.css';

export default async function UniversityHostUsers({ id }: { id: string }) {
  const data = await customFetch<UniversityHostUser[]>(
    API_HSOT.host_detail(id),
    {
      method: 'GET',
      next: { tags: [FETCH_TAG.hostUsers] },
    },
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>호스트 유저</h1>
        <DrawerButton variant="host-create">
          <UniversityHostCreateForm id={id} />
        </DrawerButton>
      </div>
      <HostUserTable data={data} />
    </div>
  );
}
