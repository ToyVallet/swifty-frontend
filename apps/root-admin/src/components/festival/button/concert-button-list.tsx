'use client';

import {
  ConcertUpdateForm,
  DeleteButton,
  DrawerButton,
  LineupCreateForm,
} from '@components';
import { API_CONCERT, FETCH_TAG } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { ConcertsResponse } from '@type';
import { Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useConcertCRUD } from 'src/hooks';

interface Props extends ConcertsResponse {
  festivalId: string;
}

export default function ConcertButtonList({ festivalId, ...props }: Props) {
  const router = useRouter();
  const { error, deleteConcert } = useConcertCRUD();
  const onDelet = async () => {
    await deleteConcert(props.subId);
    if (!error) {
      await revalidate(FETCH_TAG.festivalsDetail(festivalId));
      router.replace(`/festivals/${festivalId}`);
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap={'1rem'}>
        <DrawerButton variant="concert-update">
          <ConcertUpdateForm festivalId={festivalId} {...props} />
        </DrawerButton>
        <DeleteButton
          title={`${props.name} 삭제`}
          description="해당 콘서트를 삭제하시겠습니까?"
          onConfirm={onDelet}
          size="middle"
        >
          콘서트 삭제
        </DeleteButton>
      </Flex>
      <DrawerButton variant="lineup-create">
        <LineupCreateForm concertSubId={props.subId} festivalId={festivalId} />
      </DrawerButton>
    </Flex>
  );
}
