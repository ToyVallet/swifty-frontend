'use client';

import type { User } from '@type';

import UserStateButtonList from './user-state-button-list';
import styles from './userInfo.module.css';

export default function UserInfo(props: User) {
  const keys = Object.keys(props).filter(
    (name) => name !== 'userSubId' && name !== 'status',
  ) as (keyof User)[];

  return (
    <div className={styles.container}>
      <UserStateButtonList userSubId={props.userSubId} status={props.status} />
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
