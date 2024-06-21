'use client';

import { Card, ConcertCreateForm, DrawerButton } from '@components/festival';
import type { ConcertsResponse } from '@type/concert';
import type { TabsProps } from 'antd';
import { Tabs as AntdTabs } from 'antd';
import React, { useRef } from 'react';

import styles from './tabs.module.css';

export default function Tabs({
  concertInfo,
  ...props
}: { concertInfo: ConcertsResponse } & TabsProps) {
  const newTabIndex = useRef(0);
  return (
    <>
      <div className={styles.wrapper}>
        <AntdTabs {...props} hideAdd type="editable-card" />
        <DrawerButton variant="concert-create">
          <ConcertCreateForm />
        </DrawerButton>
      </div>
      <Card>
        <Card.ConcertDescription {...concertInfo} />
      </Card>
    </>
  );
}
