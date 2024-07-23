'use client';

import type { User } from '@type';

import UserStateButtonList from './user-state-button-list';
import styles from './userInfo.module.css';

export default function UserInfo(props: User) {
  const keys = Object.keys(props).filter(
    (name) => name !== 'userId' && name !== 'status',
  ) as (keyof User)[];

  return (
    <div className={styles.container}>
      <UserStateButtonList id={props.id} status={props.status} />
      <ul className={styles.list}>
        {keys.map((key) => (
          <li key={key}>
            <span className={styles.listItem}>
              <strong>{key.toLocaleUpperCase()}</strong> &#58; &nbsp;
              {props[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
