'use client';

import { Loading3QuartersOutlined } from '@ant-design/icons';
import { LockButton } from '@components';
import { useConcertCRUD, useLock } from '@hooks';
import type { ConcertsResponse } from '@type';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import type { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect } from 'react';

dayjs.extend(updateLocale);
dayjs.updateLocale('ko_KR', { weekStart: 0 });

type FieldType = {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
};

interface IConcertUpdateForm
  extends Omit<ConcertsResponse, 'lineUpInfoResponses'> {
  festivalId: string;
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function ConcertUpdateForm({
  id,
  name,
  location,
  startDate,
  endDate,
  description,
  form,
  onClose,
}: IConcertUpdateForm) {
  const { isLoading, updateConcert, error } = useConcertCRUD();

  const [isLock, toggleLock] = useLock(true);

  const initialValues = {
    name: name,
    startDate: dayjs(startDate),
    endDate: dayjs(endDate),
    location: location,
    description: description,
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await updateConcert(id, { ...values });
    if (!error) {
      toggleLock();
      onClose?.();
    }
  };

  useEffect(() => {
    if (!isLock) return;
    form?.setFieldsValue({
      name: name,
      startDate: dayjs(startDate),
      endDate: dayjs(endDate),
      location: location,
      description: description,
    });
  }, [isLock]);

  if (isLoading) return <Loading3QuartersOutlined spin />;

  return (
    <>
      <Form
        form={form}
        id="concert-update"
        layout="vertical"
        initialValues={initialValues}
        disabled={isLock}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="콘서트 이름"
              rules={[{ required: true }]}
            >
              <Input placeholder="콘서트 이름을 작성해주세요" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="startDate"
              label="콘서트 시작 시점"
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                locale={locale}
                disabled={isLock}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="endDate"
              label="콘서트 종료 시점"
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                locale={locale}
                disabled={isLock}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="location"
              label="콘서트 장소"
              rules={[
                { required: true, message: 'Please enter concert location' },
              ]}
            >
              <Input placeholder="ex) 강당" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="콘서트 설명"
              rules={[
                { required: true, message: 'please enter concert description' },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="ex) 물을 지참해 주시기 바랍니다."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <LockButton isLock={isLock} toggleLock={toggleLock} />
    </>
  );
}
