'use client';

import { Upload } from '@components/festival';
import { API_UNIVERSITY } from '@lib/constant/api';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import { useState } from 'react';

type FieldType = {
  name: string;
  addr: string;
  logo: UploadFile[];
};

interface Props {
  onClose?: () => void;
  form?: FormInstance<FieldType>;
}

export default function UniversityCreateForm({ onClose, form }: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  form?.setFieldValue('logo', fileList);
  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const imageFile = values.logo[0]!;
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('addr', values.addr);
    formData.append('logo', imageFile.originFileObj as RcFile, imageFile.name);

    await customFetch(API_UNIVERSITY.post_university(), {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    await revalidate('university');
    //onClose?.();
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="University"
            rules={[{ required: true, message: '대학명을 필수 기재해주세요' }]}
          >
            <Input placeholder="OO대학교" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="addr"
            label="Address"
            rules={[
              { required: true, message: '대학 위치 주소 명을 기입해주세요' },
            ]}
          >
            <Input placeholder="서울특별시 마포구" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="logo"
            label="University Logo"
            rules={[
              {
                required: true,
                message: '학교 로고 이미지를 업로드 해주세요!',
              },
            ]}
          >
            <Upload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
