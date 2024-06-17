import type { BreadcrumbList } from '@components';
import { BreadCrumbs } from '@components';
import School from '@icons/school.svg';
import { API_UNIVERSITY } from '@lib';
import { type Params, customFetch } from '@swifty/shared-lib';
import type { UniversityDetail } from '@type';
import { Avatar } from 'antd';
import Image from 'next/image';
import { Suspense } from 'react';

import styles from './university-detail.module.css';

export default async function UniversityDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await customFetch<UniversityDetail>(
    API_UNIVERSITY.university_detail(id),
    {
      method: 'GET',
    },
  );
  const breadcrumbList: BreadcrumbList = [
    {
      title: 'University',
      path: '/university',
    },
    {
      title: (
        <div className={styles.breadcrumb}>
          <Avatar
            src={
              data.fileInfoResponse.url && (
                <Image
                  src={data.fileInfoResponse.url}
                  alt="avatar"
                  width={50}
                  height={50}
                />
              )
            }
            icon={!data.fileInfoResponse.url && <School />}
          />
          <span>{data.universityName}</span>
        </div>
      ),
    },
  ];
  return (
    <main>
      <header>
        <BreadCrumbs separator="/" breadcrumbList={breadcrumbList} />
        <span className={styles.addr}>{data.universityAddr}</span>
      </header>
      <section>
        <Suspense fallback={<p>Loading Host User</p>}></Suspense>
        <Suspense
          fallback={<p>Loading {data.universityName} Festivals</p>}
        ></Suspense>
      </section>
    </main>
  );
}
