"use client";

import React, { useRef } from 'react';
import { Tabs as AntdTabs, TabsProps } from 'antd';
import { DrawerButton, ConcertCreateForm, Card } from '@components/festival';
import styles from './tabs.module.css';

export default function Tabs({
  concertInfo,
  ...props
}: { concertInfo: ConcertsResponse } & TabsProps) {
  const newTabIndex = useRef(0);
  return (
    <>
      <div className={styles.wrapper}>
        <AntdTabs
          {...props}
          hideAdd
          type="editable-card"
        />
        <DrawerButton
          variant='concert-create'
        >
          <ConcertCreateForm />
        </DrawerButton>
      </div>
      <Card>
        <Card.ConcertDescription
          {...concertInfo}
        />
      </Card>
    </>
  );
};
