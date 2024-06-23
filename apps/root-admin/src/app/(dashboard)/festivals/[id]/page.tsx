import type { BreadcrumbList } from '@components';
import {
  BreadCrumbs,
  ConcertPanel,
  FestivalButtonList,
  OpenHiddenToggle,
} from '@components';
import type { Params } from '@swifty/shared-lib';
import type { FestivalDetail } from '@type';
import { Descriptions, Flex } from 'antd';

import { getDetailFestival } from './get-detail-festival';
import styles from './page.module.css';

export default async function Page({ params: { id } }: Params<{ id: string }>) {
  const { adminFestivalInfoResponse, adminConcertInfoResponses } =
    await getDetailFestival(id);

  const { addr, festivalStatus, name } = adminFestivalInfoResponse;

  const breadcrumbList: BreadcrumbList = [
    { path: '/festivals', title: 'Festival' },
    { title: `${name} (${addr})` },
  ];

  const description = (
    [
      'description',
      'startDate',
      'endDate',
      'addr',
      'revealStartDate',
      'revealEndDate',
    ] as (keyof FestivalDetail)[]
  ).map((item) => ({
    key: item,
    label: item,
    children: adminFestivalInfoResponse[item],
  }));
  return (
    <main className={styles.main}>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <BreadCrumbs breadcrumbList={breadcrumbList} />
        <OpenHiddenToggle
          apiTarget="FESTIVAL"
          status={festivalStatus}
          subId={id}
          festivalId={id}
          size="large"
        />
      </Flex>
      <Flex align="center" gap={'1rem'} className={styles.headerWrapper}>
        <Descriptions items={description} />
      </Flex>
      <FestivalButtonList
        {...adminFestivalInfoResponse}
        className={styles.wrapper}
      />
      <Flex className={styles.wrapper} vertical gap={'1rem'}>
        {adminConcertInfoResponses.map((item) => (
          <ConcertPanel
            key={item.subId}
            className={styles.panel}
            festivalSubId={id}
            {...item}
          />
        ))}
      </Flex>
    </main>
  );
}
