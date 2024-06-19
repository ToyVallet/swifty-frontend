'use client';

import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { DeleteButton, DrawerButton, LineupUpdateForm } from '@components';
import { API_LINEUP, FETCH_TAG } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { LineUpInfoResponse } from '@type';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';

import styles from './lineup-card.module.css';

interface Props extends LineUpInfoResponse {
  festivalSubId: string;
}

export default function LineupCard(props: Props) {
  const {
    subId,
    title,
    description,
    performanceTime,
    lineUpImagePath,
    festivalSubId,
  } = props;
  const onClick = () => {
    console.log(subId, festivalSubId);
  };
  return (
    <Card
      style={{ width: '100%' }}
      cover={
        <Image
          alt="poster"
          src={lineUpImagePath ? lineUpImagePath : '/icons/swifty-logo.svg'}
          width={240}
          height={300}
        />
      }
      actions={[
        <DrawerButton variant="lineup-update">
          <LineupUpdateForm {...props} />
        </DrawerButton>,
        <DeleteButton
          title="라인업 삭제"
          description="해당 라인업을 삭제하시겠습니까?"
          onConfirm={async () => {
            await customFetch(API_LINEUP.lineup(subId), { method: 'DELETE' });
            await revalidate(FETCH_TAG.festivalsDetail(festivalSubId));
          }}
        >
          삭제
        </DeleteButton>,
      ]}
    >
      <Meta
        title={title}
        description={
          <CardDescription
            description={description}
            performanceTime={performanceTime}
          />
        }
      />
    </Card>
  );
}

interface DescriptionProp {
  performanceTime: string;
  description: string;
}

function CardDescription({ performanceTime, description }: DescriptionProp) {
  return (
    <div className={styles.description}>
      <span>설명 : {description}</span>
      <span>공연 시작 시간 : {performanceTime}</span>
    </div>
  );
}
