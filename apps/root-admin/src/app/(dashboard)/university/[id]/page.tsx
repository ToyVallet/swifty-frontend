import {
  BreadCrumbs,
  type BreadcrumbList,
  UniversityButtonList,
  UniversityFestivals,
  UniversityHostUsers,
} from '@components';
import School from '@icons/school.svg';
import { type Params, http } from '@swifty/shared-lib';
import type { CertificationAPI, UniversityDetail } from '@type';
import { Avatar } from 'antd';
import Image from 'next/image';

import styles from './university-detail.module.css';

async function getCertificationStatus(id: string) {
  try {
    const status = await http.get<CertificationAPI>(
      '/host/admin/certification/{id}',
      {
        credentials: 'include',
        params: { id },
        next: { tags: ['university-certificatin'] },
      },
    );
    return status;
  } catch (err) {
    return null;
  }
}

export default async function UniversityDetailPage({
  params: { id },
}: Params<{ id: string }>) {
  const data = await http.get<UniversityDetail>('/host/admin/university/{id}', {
    params: { id },
    credentials: 'include',
  });

  const certificationStatus = await getCertificationStatus(id);

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
          certificationId={certificationStatus?.id}
          certificationStatus={certificationStatus?.status}
        />
      </section>
      <section className={styles.section}>
        <UniversityHostUsers id={id} />
        <UniversityFestivals id={id} />
      </section>
    </main>
  );
}
