'use client';

import { useState } from "react";
import { Button, Table } from "antd";
import { Tabs, DrawerButton, LineupCreateForm, LineupUpdateForm, StatusNotifier } from "@components/festival";
import styles from "./table-board.module.css";

const columnsOfTable = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { dataIndex: 'isopened', key: 'isopened' },
  { dataIndex: 'update', key: 'update' },
  { dataIndex: 'delete', key: 'delete' },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function ConcertBoard({
  festivalSubId,
  concertsInfo,
}: { festivalSubId: string; concertsInfo: ConcertsResponse[]; }) {
  const defaultPanes = concertsInfo.map(({ subId, name }) => {
    return {
      label: name,
      key: subId,
    };
  });
  const [activeKey, setActiveKey] = useState(defaultPanes[0]?.key);
  const [items, setItems] = useState(defaultPanes);
  const activeConcertInfo = concertsInfo.filter(({ subId }) => subId === activeKey)[0];
  const dataSource = activeConcertInfo?.lineUpInfoResponses.map(({ subId, title, description, performanceDate, isOpened }) => ({
    key: subId,
    subId: subId,
    name: title,
    date: new Date(performanceDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Seoul'
    }),
  );

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onEdit = async (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove')
      remove(targetKey);
  };

  const remove = async (targetKey: TargetKey) => {
    if (confirm('정말로 삭제하시겠습니까?'))
      await removeConcert(targetKey as string);
  };

  return (
    <>
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        onEdit={onEdit}
        concertInfo={activeConcertInfo}
        festivalSubId={festivalSubId}
      />
      {
        activeConcertInfo &&
        <div className={styles.wrapper}>
          <DrawerButton className={styles.lineupCreateButton} variant='lineup-create'>
            <LineupCreateForm />
          </DrawerButton>
          <Table
            columns={columnsOfTable}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      }
    </>
  );
}
