'use client';

import { ConcertCreateForm, ConcertPanel, DrawerButton } from '@components/festival';
import type { ConcertsResponse } from '@type/concert';
import type { TabsProps } from 'antd';
import { Tabs as AntdTabs, Flex } from 'antd';
import React from 'react';

import styles from './tabs.module.css';

export default function Tabs({
  concertInfo,
  festivalSubId,
  open,
  hide,
  ...props
}: {
  festivalSubId: string;
  concertInfo: ConcertsResponse
  open: (id: string) => Promise<void>;
  hide: (id: string) => Promise<void>;
} & TabsProps) {
  return (
    <>
      <Flex className={styles.wrapper} vertical align='end' gap={24}>
        <DrawerButton className={styles.concertCreateButton} variant="concert-create">
          <ConcertCreateForm festivalSubId={festivalSubId} />
        </DrawerButton>
        <AntdTabs {...props} hideAdd type="editable-card" />
      </Flex>
      {
        concertInfo &&
        <ConcertPanel
          className={styles.panel}
          festivalSubId={festivalSubId}
          open={open}
          hide={hide}
          {...concertInfo}
        />
      }
    </>
  );
}
