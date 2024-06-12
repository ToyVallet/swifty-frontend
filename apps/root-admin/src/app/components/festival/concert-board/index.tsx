'use client';

import { useState } from "react";
import { Button, Flex, Table } from "antd";
import { Tabs, DrawerButton, LineupCreateForm, LineupUpdateForm } from "@components/festival";
import type { ConcertsResponse } from '@app/types/concert';
import useConcert from "@app/hooks/festival/useConcert";
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useLineup } from "@app/hooks/festival/useLineup";

import styles from "./concert-board.module.css";

const columnsOfTable = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { dataIndex: 'isopened', key: 'isopened' },
  { dataIndex: 'deatil', key: 'deatil' },
  { dataIndex: 'update', key: 'update' },
  { dataIndex: 'delete', key: 'delete' },
];

type TargetKey =
  | React.MouseEvent
  | React.KeyboardEvent
  | string;

export default function ConcertBoard({
  festivalSubId,
  concertsInfo,
}: { festivalSubId: string; concertsInfo: ConcertsResponse[]; }) {
  const defaultPanes = concertsInfo.map(({ subId, name }) => {
    return { label: name, key: subId };
  });
  const [activeKey, setActiveKey] = useState(defaultPanes[0]?.key);
  const [items, setItems] = useState(defaultPanes);
  const activeConcertInfo = concertsInfo.filter(({ subId }) => subId === activeKey)[0];
  const dataSource = activeConcertInfo?.lineUpInfoResponses.map(({ subId, title, description, performanceDate }) => ({
    key: subId,
    subId: subId,
    name: title,
    date: new Date(performanceDate).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul'
    }),
    description: description,
    update: <DrawerButton variant="lineup-update"><LineupUpdateForm /></DrawerButton>,
    delete: <Button onClick={() => removeLineup(subId)}>삭제</Button>
  }));

  const removeLineup = async (subId: string) => {
    if (confirm("정말로 삭제하시겠습니까?"))
      await deleteLineup(subId);
  }

  const { isLoading, deleteConcert } = useConcert();
  const { deleteLineup } = useLineup();

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onEdit = async (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove')
      remove(targetKey);
  };

  const remove = async (targetKey: TargetKey) => {
    if (confirm('정말로 삭제하시겠습니까?'))
      await deleteConcert(festivalSubId, targetKey as string);
  };

  if (isLoading) return <Loading3QuartersOutlined spin />

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
      {activeConcertInfo &&
        <>
          <Flex justify="end">
            <DrawerButton className={styles.lineupCreateButton} variant='lineup-create'>
              <LineupCreateForm concertSubId={activeConcertInfo.subId} />
            </DrawerButton>
          </Flex>
          <Table
            columns={columnsOfTable}
            dataSource={dataSource}
            pagination={false}
          />
        </>
      }
    </>
  );
}
