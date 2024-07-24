'use client';

import {
  DeleteButton,
  DrawerButton,
  LineupUpdateForm,
  OpenHiddenToggle,
} from '@components';
import { FETCH_TAG } from '@lib';
import { revalidate } from '@swifty/shared-lib';
import type { LineUpInfoResponse } from '@type';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';
import { useLineupCRUD } from 'src/hooks';

import styles from './lineup-card.module.css';

interface Props extends LineUpInfoResponse {
  festivalId: string;
}

export default function LineupCard(props: Props) {
  const {
    id,
    title,
    description,
    performanceTime,
    lineupImagePath,
    festivalId,
    lineupStatus,
  } = props;

  const { error, deleteLineup } = useLineupCRUD();

  const onDelete = async () => {
    await deleteLineup(id);
    if (!error) {
      await revalidate(FETCH_TAG.festivalsDetail(festivalId));
    }
  };

  return (
    <Card
      style={{ width: '100%' }}
      title={title}
      extra={
        <OpenHiddenToggle
          id={id}
          apiTarget="LINEUP"
          status={lineupStatus}
          festivalId={festivalId}
        />
      }
      cover={
        <Image
          alt="poster"
          src={lineupImagePath ? lineupImagePath : '/icons/swifty-logo.svg'}
          width={150}
          height={150}
          style={{ objectFit: 'contain' }}
          priority
        />
      }
      actions={[
        <DrawerButton variant="lineup-update">
          <LineupUpdateForm {...props} />
        </DrawerButton>,
        <DeleteButton
          title="라인업 삭제"
          description="해당 라인업을 삭제하시겠습니까?"
          onConfirm={onDelete}
        >
          삭제
        </DeleteButton>,
      ]}
    >
      <Meta
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
