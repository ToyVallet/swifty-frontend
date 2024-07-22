'use client';

import { DeleteButton, NotificationHandlerContext } from '@components';
import { http, revalidate } from '@swifty/shared-lib';
import type { UserStatus } from '@type';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import styles from './userInfo.module.css';

interface UserActionsProps {
  userId: string;
  status: UserStatus;
}

type States = 'active' | 'ban' | 'pause';
const USER_STATES = ['active', 'ban', 'pause'] as const;

const USER_STATES_API = {
  active: (id: string) =>
    http.patch(
      '/root/admin/user/{id}/activation',
      {},
      { credentials: 'include', params: { id } },
    ),
  ban: (id: string) =>
    http.patch(
      '/root/admin/user/{id}/ban',
      {},
      { credentials: 'include', params: { id } },
    ),
  pause: (id: string) =>
    http.patch(
      '/root/admin/user/{id}/pause',
      {},
      { credentials: 'include', params: { id } },
    ),
};

export default function UserStateButtonList({
  userId,
  status,
}: UserActionsProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>(status);
  const handleNotification = useContext(NotificationHandlerContext);

  const changeStatesToUserStatus = (state: States): UserStatus => {
    const upper = state.toUpperCase();
    if (upper === 'BAM') return 'BANNED';
    if (upper === 'PAUSE') return 'PAUSED';
    return upper as UserStatus;
  };

  // 낙관적 업데이트 적용
  const onChangeStatus = async (state: States) => {
    if (changeStatesToUserStatus(state) === userStatus) return;

    const prevStatus = status;
    setUserStatus(() => changeStatesToUserStatus(state));
    try {
      await USER_STATES_API[state](userId);

      setErrorMessage(null);
      revalidate('users');
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(`Change ${state.toUpperCase()} : ${err.message}`);
      }
      setUserStatus(prevStatus);
      handleNotification(
        {
          message: 'Error',
          description: '사용자 상태 변경에 실패했습니다.',
        },
        'error',
      );
    }
  };

  const deleteUser = async () => {
    await http.delete('/root/admin/user/{id}', {
      credentials: 'include',
      params: { id: userId },
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
          <DeleteButton
            title="계정삭제"
            onConfirm={deleteUser}
            description="해당 계정을 삭제하시겠습니까?"
            size="large"
          >
            DELETE
          </DeleteButton>
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
