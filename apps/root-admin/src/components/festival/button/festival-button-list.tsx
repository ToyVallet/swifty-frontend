'use client';

import {
  ConcertCreateForm,
  DeleteButton,
  DrawerButton,
  FestivalUpdateForm,
} from '@components';
import { FETCH_TAG } from '@lib';
import { type PropsWithClassName, http, revalidate } from '@swifty/shared-lib';
import type { FestivalDetail } from '@type';
import { Flex } from 'antd';
import { useRouter } from 'next/navigation';

export default function FestivalButtonList({
  className,
  id,
  ...props
}: FestivalDetail & PropsWithClassName) {
  const router = useRouter();
  const onDelet = async () => {
    await http.delete('/host/admin/festival/{id}', {
      params: { id },
      credentials: 'include',
    });

    await revalidate(FETCH_TAG.festivals);
    router.replace(`/festivals`);
  };

  return (
    <Flex align="center" justify="space-between" className={className}>
      <Flex align="center" gap={'1rem'}>
        <DrawerButton variant="festival-update">
          <FestivalUpdateForm id={id} {...props} />
        </DrawerButton>
        <DeleteButton
          title={`${props.name} 삭제`}
          description="해당 페스티벌을 삭제하시겠습니까?"
          onConfirm={onDelet}
          size="middle"
        >
          {`${props.name} 페스티벌 삭제`}
        </DeleteButton>
      </Flex>
      <DrawerButton variant="concert-create">
        <ConcertCreateForm festivalId={id} />
      </DrawerButton>
    </Flex>
  );
}
