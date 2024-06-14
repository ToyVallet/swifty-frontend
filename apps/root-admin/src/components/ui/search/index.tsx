'use client';

import getUniversity from '@api/get-university';
import type { UniversityInfo } from '@type/api';
import type { UploadFile } from 'antd';
import { Button, Card, Input, List, Modal } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import type { FormInstance } from 'antd/lib';
import { useState } from 'react';

import styles from './search.module.css';

const { Search } = Input;

interface Props {
  form?: FormInstance;
}

export default function SearchUniversity({ form }: Props) {
  const [modal, setModal] = useState(false);
  const [universityList, setuniversityList] = useState<UniversityInfo[] | null>(
    null,
  );
  const onOpen = () => {
    setModal(true);
  };

  const handleSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    const {
      dataSearch: { content },
    } = await getUniversity(value);
    setuniversityList(content);
  };

  const onSelect = (item: UniversityInfo) => {
    form?.setFieldValue('name', item.schoolName);
    form?.setFieldValue('addr', item.adres);
    setModal(false);
  };

  return (
    <div className={styles.search}>
      <Button type="primary" onClick={onOpen}>
        대학교 검색
      </Button>
      <Modal title="대학교 검색" open={modal} onCancel={() => setModal(false)}>
        <Search placeholder="대학 검색" onSearch={handleSearch} enterButton />
        {Array.isArray(universityList) && universityList.length === 0 && (
          <Card>대학 검색 결과가 존재하지 않습니다.</Card>
        )}
        {Array.isArray(universityList) && universityList.length > 0 && (
          <List
            style={{ marginTop: '1rem' }}
            itemLayout="horizontal"
            dataSource={universityList}
            renderItem={(item) => (
              <List.Item
                className={styles.searchItem}
                onClick={() => onSelect(item)}
              >
                <List.Item.Meta
                  className={styles.searchMeta}
                  title={item.schoolName}
                  description={item.adres}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
}
