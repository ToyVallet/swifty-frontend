"use client";

import React, { useRef } from 'react';
import { Tabs as AntdTabs, TabsProps } from 'antd';
import { DrawerButton, ConcertCreateForm, Card } from '@components/festival';
import styles from './tabs.module.css';
import { ConcertsResponse } from '@app/types/concert';

export default function Tabs({
  festivalSubId,
  concertInfo,
  ...props
}: { festivalSubId: string; concertInfo: ConcertsResponse; } & TabsProps) {
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
          <ConcertCreateForm festivalSubId={festivalSubId} />
        </DrawerButton>
      </div>
      {
        concertInfo &&
        <Card>
          <Card.ConcertDescription {...concertInfo} />
        </Card>
      }
    </>
  );
};
