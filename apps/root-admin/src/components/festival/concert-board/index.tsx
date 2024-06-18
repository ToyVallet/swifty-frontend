'use client';

import { Loading3QuartersOutlined } from '@ant-design/icons';
import {
  DrawerButton,
  LineupCreateForm,
  LineupUpdateForm,
  Tabs,
} from '@components';
import {
  useActiveConcert,
  useConcertCRUD,
  useLineupCRUD,
} from '@hooks/festival';
import type { ConcertsResponse } from '@type';
import { Button, Flex, Table } from 'antd';
import { useState } from 'react';
import FestivalDrawerButton from 'src/components/festival/festival-drawer-button';

import styles from './concert-board.module.css';

const columnsOfTable = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'time', dataIndex: 'time', key: 'time' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { dataIndex: 'update', key: 'update' },
  { dataIndex: 'delete', key: 'delete' },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function ConcertBoard({
  festivalSubId,
  concertsInfo,
}: {
  festivalSubId: string;
  concertsInfo: ConcertsResponse[];
}) {
  const { activeConcert, defaultPanes, activeKey, setActiveKey, open, hide } =
    useActiveConcert(concertsInfo);
  const [isLock, setIsLock] = useState<boolean>(true);
  const toggleLock = () => {
    setIsLock((prev) => !prev);
  };
  const lock = () => {
    setIsLock(true);
  };
  const dataSource = activeConcert?.lineUpInfoResponses.map(
    ({
      subId,
      title,
      description,
      performanceTime,
      lineUpImagePath,
      lineUpStatus,
    }) => ({
      key: subId,
      subId: subId,
      name: title,
      time: performanceTime,
      description: description,
      status: lineUpStatus,
      update: (
        <FestivalDrawerButton
          variant="lineup-update"
          isLock={isLock}
          lock={lock}
        >
          <LineupUpdateForm
            subId={subId}
            title={title}
            description={description}
            performanceTime={performanceTime}
            lineUpImagePath={lineUpImagePath}
            lineUpStatus={lineUpStatus}
            isLock={isLock}
            toggleLock={toggleLock}
          />
        </FestivalDrawerButton>
      ),
      delete: <Button onClick={() => removeLineup(subId)}>삭제</Button>,
    }),
  );

  const removeLineup = async (subId: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) await deleteLineup(subId);
  };

  const { isLoading, deleteConcert } = useConcertCRUD();

  const { deleteLineup } = useLineupCRUD();

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onEdit = async (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') remove(targetKey);
  };

  const remove = async (targetKey: TargetKey) => {
    if (confirm('정말로 삭제하시겠습니까?'))
      await deleteConcert(targetKey as string);
  };

  if (isLoading) return <Loading3QuartersOutlined spin />;

  return (
    <>
      <Tabs
        items={defaultPanes}
        activeKey={activeKey}
        onChange={onChange}
        onEdit={onEdit}
        concertInfo={activeConcert as ConcertsResponse}
        festivalSubId={festivalSubId}
        open={open}
        hide={hide}
      />
      {activeConcert && (
        <>
          <Flex justify="end">
            <DrawerButton
              className={styles.lineupCreateButton}
              variant="lineup-create"
            >
              <LineupCreateForm concertSubId={activeConcert.subId} />
            </DrawerButton>
          </Flex>
          <Table
            columns={columnsOfTable}
            dataSource={dataSource}
            pagination={false}
          />
        </>
      )}
    </>
  );
}
