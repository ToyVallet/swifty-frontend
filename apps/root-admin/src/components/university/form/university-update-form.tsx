'use client';

import { NotificationHandlerContext, SearchUniversity } from '@components';
import { http, revalidate } from '@swifty/shared-lib';
import type { University } from '@type';
import { Col, Form, Input, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import { useContext } from 'react';

type FieldType = {
  name: string;
  addr: string;
};

interface Props {
  onClose?: () => void;
  form?: FormInstance<FieldType>;
  university: University;
}

export default function UniversityUpdateForm({
  onClose,
  form,
  university,
}: Props) {
  const initialValue = { name: university.name, addr: university.addr };
  const handleNotification = useContext(NotificationHandlerContext);

  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    try {
      await http.patch('/root/admin/university/{id}', values, {
        credentials: 'include',
        params: { id: university.id },
      });

      await revalidate('university');
      onClose?.();
    } catch (err) {
      handleNotification(
        {
          message: '대학 정보 수정에 실패하였습니다.',
          description: (err as Error).message,
        },
        'error',
      );
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={initialValue}
    >
      <Row gutter={16}>
        <Col span={12}>
          <SearchUniversity form={form} />
          <Form.Item
            name="name"
            label="University"
            rules={[{ required: true, message: '대학명을 필수 기재해주세요' }]}
          >
            <Input placeholder="OO대학교" readOnly />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="addr"
            label="Address"
            rules={[
              { required: false, message: '대학 위치 주소 명을 기입해주세요' },
            ]}
          >
            <Input placeholder="서울특별시 마포구" readOnly />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
