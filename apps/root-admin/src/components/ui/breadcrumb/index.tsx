'use client';

import { Breadcrumb as AntdBreadCrumb, type BreadcrumbProps } from 'antd';
import Link from 'next/link';

import styles from './breadcrumb.module.css';

export type BreadcrumbList = {
  title: string | JSX.Element;
  path?: string;
  icon?: string | null;
}[];

interface Props {
  separator?: string;
  breadcrumbList: BreadcrumbList;
}

type ItemRender = BreadcrumbProps['itemRender'];
const itemRender: ItemRender = (currentRoute, params, items, paths) => {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span className={styles.text}>{currentRoute.title}</span>
  ) : (
    <Link href={`/${paths.join('/')}`} className={styles.text}>
      {currentRoute.title}
    </Link>
  );
};

export default function Breadcrumb({ breadcrumbList, separator = '/' }: Props) {
  return (
    <AntdBreadCrumb
      separator={<span className={styles.separator}>{separator}</span>}
      itemRender={itemRender}
      items={breadcrumbList}
    />
  );
}
