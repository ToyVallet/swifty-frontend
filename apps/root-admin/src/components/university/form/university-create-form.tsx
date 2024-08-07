'use client';

import {
  NotificationHandlerContext,
  SearchUniversity,
  Upload,
} from '@components';
import { http, revalidate } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import { useContext, useState } from 'react';

interface FieldType {
  name: string;
  addr: string;
  logo: UploadFile[];
}

interface Props {
  onClose?: () => void;
  form?: FormInstance<FieldType>;
}

export default function UniversityCreateForm({ onClose, form }: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleNotification = useContext(NotificationHandlerContext);
  form?.setFieldValue('logo', fileList);
  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('addr', values.addr);

    if (values.logo.length > 0) {
      const imageFile = values.logo[0]!;
      formData.append(
        'logo',
        imageFile.originFileObj as RcFile,
        imageFile.name,
      );
    }

    try {
      await http.post('/root/admin/university', formData, {
        credentials: 'include',
      });

      form?.resetFields(['name', 'addr', 'logo']);
      setFileList([]);
      await revalidate('university');
      onClose?.();
    } catch (err) {
      handleNotification(
        {
          message: '대학 생성에 실패하였습니다.',
          description: (err as Error).message,
        },
        'error',
      );
    }
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={12}></Col>
      </Row>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <SearchUniversity form={form} />
            <Form.Item
              name="name"
              label="University"
              rules={[
                { required: true, message: '대학명을 필수 기재해주세요' },
              ]}
            >
              <Input placeholder="대학교" readOnly />
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
              <Input placeholder="서울특별시 마포구" readOnly />
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
                  required: false,
                  message: '학교 로고 이미지를 업로드 해주세요!',
                },
              ]}
            >
              <Upload fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
