'use client';

import {
  DeleteButton,
  DrawerButton,
  NotificationHandlerContext,
  OpenHiddenToggle,
  UniversityCertificationCreateForm,
  UniversityLogoUpdateForm,
  UniversityUpdateForm,
} from '@components';
import { handleApiError } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import type { Status, University } from '@type';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import styles from './button-list.module.css';

type Props = {
  certificationId: string | null | undefined;
  certificationStatus: Status | null | undefined;
} & University;

export default function UniversityButtonList({ ...props }: Props) {
  const { id, certificationId, certificationStatus } = props;

  const router = useRouter();
  const handleNotification = useContext(NotificationHandlerContext);

  const onDelete = async () => {
    await http.delete('/root/admin/university/{id}', {
      credentials: 'include',
      params: { id },
    });
    router.replace('/university');
  };

  const onDeleteCertification = async () => {
    try {
      await http.delete('/host/admin/certification/{id}', {
        credentials: 'include',
        params: { id: certificationId || '' },
      });
      await revalidate('university-certificatin');
      handleNotification({
        message: '재학생 인증을 삭제하였습니다.',
      });
    } catch (err) {
      handleApiError(err, handleNotification);
    }
  };
  return (
    <div className={styles.container}>
      <DrawerButton variant="university-update">
        <UniversityUpdateForm university={props} />
      </DrawerButton>

      <DrawerButton variant="university-logo-update">
        <UniversityLogoUpdateForm university={props} />
      </DrawerButton>

      {!certificationId && (
        <DrawerButton variant="university-certification">
          <UniversityCertificationCreateForm id={id} />
        </DrawerButton>
      )}
      <DeleteButton
        title="계정 삭제"
        description="해당 대학을 삭제하시겠습니까?"
        onConfirm={onDelete}
        size="middle"
      >
        대학 삭제
      </DeleteButton>

      {certificationId && certificationStatus && (
        <>
          <DeleteButton
            title="재학생 인증 삭제"
            description="해당 재학생 인증을 삭제하시겠습니까?"
            onConfirm={onDeleteCertification}
            size="middle"
          >
            재학생 인증 삭제
          </DeleteButton>
          <OpenHiddenToggle
            id={certificationId}
            apiTarget="CERTIFICATION"
            status={certificationStatus}
            size="large"
          />
        </>
      )}
    </div>
  );
}
