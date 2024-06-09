"use client";

import React from 'react';
import { Tabs as AntdTabs, Flex } from 'antd';
import type { TabsProps } from 'antd';
import { DrawerButton, ConcertCreateForm, Card } from '@components/festival';
import type { ConcertsResponse } from '@app/types/concert';

import styles from './tabs.module.css';

export default function Tabs({
  festivalSubId,
  concertInfo,
  ...props
}: { festivalSubId: string; concertInfo?: ConcertsResponse; } & TabsProps) {
  return (
    <>
      <Flex justify='end'>
        <DrawerButton className={styles.concertCreateButton} variant='concert-create'>
          <ConcertCreateForm festivalSubId={festivalSubId} />
        </DrawerButton>
      </Flex>
      <Flex justify='end'>
        <AntdTabs
          className={styles.tabs}
          type="editable-card"
          hideAdd
          {...props}
        />
      </Flex>
      {concertInfo &&
        <Card className={styles.card}>
          <Card.ConcertDescprtion festivalSubId={festivalSubId} {...concertInfo} />
        </Card>
      }
    </>
  );
};
