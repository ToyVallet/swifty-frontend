'use client';

import { API_CLIENT } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { UserStatus } from '@type';
import { Button, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './userInfo.module.css';

interface UserActionsProps {
  userSubId: string;
  status: UserStatus;
}

type States = 'active' | 'ban' | 'pause';
const USER_STATES = ['active', 'ban', 'pause'] as const;

export default function UserStateButtonList({
  userSubId,
  status,
}: UserActionsProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(status);

  const changeStatesToUserStatus = (state: States) =>
    state.toUpperCase() === 'BAN'
      ? 'BANNED'
      : (state.toUpperCase() as UserStatus);

  // 낙관적 업데이트 적용
  const onChangeStatus = async (state: States) => {
    if (changeStatesToUserStatus(state) === userStatus) return;

    const prevStatus = status;
    setUserStatus(() => changeStatesToUserStatus(state));
    try {
      await customFetch(API_CLIENT[state](userSubId), {
        method: 'PATCH',
      });
      setErrorMessage(null);
      await revalidate('users');
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Change ${state.toUpperCase()} : ${err.message}`);
      }
      setUserStatus(prevStatus);
    }
  };

  const deleteUser = async () => {
    await customFetch(API_CLIENT.user(userSubId), {
      method: 'DELETE',
    });
    await revalidate('users');
    router.replace('/user');
  };

  return (
    <div className={styles.container}>
      <section>
        <h3 className={styles.listItem}>
          <strong>USER STATUS</strong>
        </h3>
        <div className={styles.buttonSection}>
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

          {USER_STATES.map((state) => (
            <Button
              size="large"
              onClick={() => onChangeStatus(state)}
              type={
                userStatus === changeStatesToUserStatus(state)
                  ? 'primary'
                  : 'default'
              }
              key={state}
            >
              {state.toUpperCase()}
            </Button>
          ))}
        </div>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </section>
    </div>
  );
}
