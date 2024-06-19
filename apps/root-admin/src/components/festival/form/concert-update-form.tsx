'use client';

import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useConcertCRUD, useLock } from '@hooks';
import type { ConcertsResponse } from '@type';
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select } from 'antd';
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
  subId,
  name,
  location,
  startDate,
  endDate,
  description,
  form,
  onClose,
}: IConcertUpdateForm) {
  const { isLoading, updateConcert } = useConcertCRUD();

  const [isLock, toggleLock] = useLock(true);

  const initialValues = {
    name: name,
    startDate: dayjs(startDate),
    endDate: dayjs(endDate),
    location: location,
    description: description,
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await updateConcert(subId, { ...values });
    toggleLock();
    onClose?.();
  };

  /*  const onChangeStatus = async (status: ConcertStatus) => {
    if (concertStatus === 'HIDDEN' && status === 'OPENED') {
      await open(subId);
      return;
    }
    if (concertStatus === 'OPENED' && status === 'HIDDEN') await hidden(subId);
  }; */

  // 초기 콘서트 데이터 세팅
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
      <Flex justify="end">
        <Button onClick={toggleLock}>
          {isLock ? <LockFilled /> : <UnlockOutlined />}
        </Button>
      </Flex>
      {/*       <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="콘서트 상태">
              <Flex justify="start" gap={24}>
                {CONCERT_STATUS.map((status, idx) => (
                  <Button
                    key={idx}
                    size="large"
                    onClick={() => onChangeStatus(status)}
                    type={status === concertStatus ? 'primary' : 'dashed'}
                  >
                    {status}
                  </Button>
                ))}
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form> */}
    </>
  );
}
