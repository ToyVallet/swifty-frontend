'use client';

import { API_CLIENT } from '@app/lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { IError } from '@swifty/shared-lib';
import type { User, UserStatus } from '@type/user';
import { Button, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './userInfo.module.css';

export default function UserInfo(props: User) {
  const router = useRouter();
  const [status, setStatus] = useState<UserStatus>(props.status);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const keys = Object.keys(props).filter(
    (name) => name != 'userSubId',
  ) as (keyof User)[];

  const changeActivate = async () => {
    const prevStatus = status;
    setStatus('ACTIVE');
    customFetch(API_CLIENT.activation(props.userSubId), {
      method: 'PATCH',
    }).catch((err: Error | IError) => {
      setErrorMessage(`Change ${status} : ${err.message}`);
      setStatus(prevStatus);
      return err;
    });
  };
  const changeBan = () => {
    const prevStatus = status;
    setStatus('BANNED');
    customFetch(API_CLIENT.ban(props.userSubId), {
      method: 'PATCH',
    }).catch((err: Error | IError) => {
      setStatus(prevStatus);
      setErrorMessage(err.message);
      return err;
    });
  };
  const changePause = async () => {
    const prevStatus = status;
    setStatus('PAUSE');
    customFetch(API_CLIENT.pause(props.userSubId), {
      method: 'PATCH',
    }).catch((err: Error | IError) => {
      setStatus(prevStatus);
      setErrorMessage(err.message);
      return err;
    });
  };
  const deleteUser = async () => {
    await customFetch(API_CLIENT.user(props.userSubId), {
      method: 'DELETE',
    });
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
      <ul className={styles.list}>
        {keys.map((key) => (
          <li key={key}>
            <span className={styles.listItem}>
              <strong>{key.toLocaleUpperCase()}</strong> &#58; &nbsp;
              {key === 'status' ? status : props[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
