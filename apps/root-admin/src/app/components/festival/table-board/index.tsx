'use client';

import { ConcertsResponse } from '@app/types/concert';
import {
  DrawerButton,
  LineupCreateForm,
  LineupUpdateForm,
  StatusNotifier,
  Tabs,
} from '@components/festival';
import { Button, Table } from 'antd';
import { useState } from 'react';

import styles from './table-board.module.css';

const columnsOfTable = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { dataIndex: 'isopened', key: 'isopened' },
  { dataIndex: 'update', key: 'update' },
  { dataIndex: 'delete', key: 'delete' },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TableBoard({
  concertsInfo,
}: {
  concertsInfo: ConcertsResponse[];
}) {
  const defaultPanes = concertsInfo.map(({ subId, name }) => {
    return {
      label: name,
      key: subId,
    };
  });
  const [activeKey, setActiveKey] = useState(defaultPanes[0]?.key);
  const [items, setItems] = useState(defaultPanes);
  const activeConcertInfo = concertsInfo.filter(
    ({ subId }) => subId === activeKey,
  )[0];
  const dataSource = activeConcertInfo?.lineUpInfoResponses.map(
    ({ subId, title, description, performanceDate, isOpened }) => ({
      key: subId,
      subId: subId,
      name: title,
      date: new Date(performanceDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul',
      }),
      description,
      isopened: <StatusNotifier status={isOpened} />,
      update: (
        <DrawerButton variant="lineup-update">
          <LineupUpdateForm />
        </DrawerButton>
      ),
      delete: <Button>삭제</Button>,
    }),
  );

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      // add();
    } else {
      remove(targetKey);
    }
  };

  const add = () => {};

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  return (
    <>
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        onEdit={onEdit}
        concertInfo={
          activeConcertInfo ?? {
            subId: '',
            name: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
            lineUpInfoResponses: [],
            concertStatus: 'BEFORE',
          }
        }
      />
      <div className={styles.wrapper}>
        <DrawerButton
          className={styles.lineupCreateButton}
          variant="lineup-create"
        >
          <LineupCreateForm />
        </DrawerButton>
        <Table
          columns={columnsOfTable}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </>
  );
}
