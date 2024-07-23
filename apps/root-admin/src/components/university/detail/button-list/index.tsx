'use client';

import { http } from '@swifty/shared-lib';
import type { University } from '@type';
import { useRouter } from 'next/navigation';
import { DeleteButton, DrawerButton } from 'src/components/ui';
import UniversityLogoUpdateForm from 'src/components/university/form/university-logo-update-form';
import UniversityUpdateForm from 'src/components/university/form/university-update-form';

import styles from './button-list.module.css';

export default function UniversityButtonList({ ...props }: University) {
  const { id } = props;

  const router = useRouter();

  const onDelete = async () => {
    await http.delete('/root/admin/university/{id}', {
      credentials: 'include',
      params: { id },
    });
    router.replace('/university');
  };
  return (
    <div className={styles.container}>
      <DrawerButton variant="university-update">
        <UniversityUpdateForm university={props} />
      </DrawerButton>

      <DrawerButton variant="university-logo-update">
        <UniversityLogoUpdateForm university={props} />
      </DrawerButton>

      <DeleteButton
        title="계정 삭제"
        description="해당 대학을 삭제하시겠습니까?"
        onConfirm={onDelete}
        size="middle"
      >
        삭제
      </DeleteButton>
    </div>
  );
}
