'use client';

import { API_CLIENT } from '@app/lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { UserStatus } from '@type/user';
import { Button, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './userInfo.module.css';

interface UserActionsProps {
  userSubId: string;
  status: UserStatus;
  onStatusChange: (newStatus: UserStatus) => void;
}

export default function UserActions({
  userSubId,
  status,
  onStatusChange,
}: UserActionsProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleStatusChange = async (
    newStatus: UserStatus,
    apiEndpoint: string,
  ) => {
    const prevStatus = status;
    onStatusChange(newStatus);

    try {
      await customFetch(apiEndpoint, { method: 'PATCH' });
      setErrorMessage(null);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Change ${newStatus} : ${err.message}`);
      }
      onStatusChange(prevStatus);
    }
  };

  const changeActivate = () =>
    handleStatusChange('ACTIVE', API_CLIENT.activation(userSubId));
  const changeBan = () =>
    handleStatusChange('BANNED', API_CLIENT.ban(userSubId));
  const changePause = () =>
    handleStatusChange('PAUSE', API_CLIENT.pause(userSubId));

  const deleteUser = async () => {
    await customFetch(API_CLIENT.user(userSubId), { method: 'DELETE' });
    router.replace('/user');
  };

  return (
    <div className={styles.container}>
      <section className={styles.buttonSection}>
        <Popconfirm
          title="계정 삭제"
          description="해당 계정을 삭제하시겠습니까?"
          okText="확인"
          okType="danger"
          cancelText="취소"
          onConfirm={deleteUser}
        >
          <Button type="primary" danger size="large">
            Delete
          </Button>
        </Popconfirm>

        <Button size="large" onClick={changeActivate} type="primary">
          Activate
        </Button>
        <Button size="large" onClick={changeBan} type="primary">
          Ban
        </Button>
        <Button size="large" onClick={changePause} type="primary">
          Pause
        </Button>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </section>
    </div>
  );
}
