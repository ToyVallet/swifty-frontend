import type { BreadcrumbList } from '@components';
import {
  BreadCrumbs,
  UniversityButtonList,
  UniversityFestivals,
  UniversityHostUsers,
} from '@components';
import School from '@icons/school.svg';
import { type Params, http } from '@swifty/shared-lib';
import type { UniversityDetail } from '@type';
import { Avatar } from 'antd';
import Image from 'next/image';

import styles from './university-detail.module.css';

export default async function UniversityDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await http.get<UniversityDetail>('/host/admin/university/{id}', {
    params: { id },
    credentials: 'include',
  });

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
          <span>{data.name}</span>
        </div>
      ),
    },
  ];
  return (
    <main>
      <header>
        <BreadCrumbs separator="/" breadcrumbList={breadcrumbList} />
        <span className={styles.addr}>{data.addr}</span>
      </header>
      <section>
        <UniversityButtonList
          id={data.id}
          addr={data.addr}
          name={data.name}
          logo={data.fileInfoResponse.url || ''}
        />
      </section>
      <section className={styles.section}>
        <UniversityHostUsers id={id} />
        <UniversityFestivals id={id} />
      </section>
    </main>
  );
}
