'use client';

import type { User, UserStatus } from '@type/user';
import { useState } from 'react';

import UserActions from './user-action';
import styles from './userInfo.module.css';

export default function UserInfo(props: User) {
  const [status, setStatus] = useState<UserStatus>(props.status);
  const keys = Object.keys(props).filter(
    (name) => name != 'userSubId',
  ) as (keyof User)[];

  return (
    <div className={styles.container}>
      <UserActions
        userSubId={props.userSubId}
        status={props.status}
        onStatusChange={setStatus}
      />
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
