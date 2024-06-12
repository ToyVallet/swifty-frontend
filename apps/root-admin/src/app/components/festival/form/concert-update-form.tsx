"use client";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Flex,
  Select,
} from 'antd';
import type { FormProps } from 'antd';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import type { ConcertsResponse } from '@app/types/concert';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';
import useConcert from '@app/hooks/festival/useConcert';

type FieldType = {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

export default function ConcertUpdateForm({
  festivalSubId,
  subId,
  name,
  location,
  startDate,
  endDate,
  description,
}: { festivalSubId: string } & Omit<ConcertsResponse, 'lineUpInfoResponses'>) {

  const { isLoading, error, updateConcert } = useConcert();
  const [isLock, setIsLock] = useState<boolean>(true);
  const toggleLock = () => { setIsLock(prev => !prev) };
  const [form] = Form.useForm();

  const initialValues = {
    name: name,
    startDate: moment(startDate),
    endDate: moment(endDate),
    location: location,
    description: description,
  };

  useEffect(() => {
    if (isLock) {
      form.setFieldsValue({
        name: name,
        startDate: moment(startDate),
        endDate: moment(endDate),
        location: location,
        description: description,
      });
    } else {
      form.setFieldsValue({
        startDate: null,
        endDate: null
      });
    }
  }, [isLock]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await updateConcert(festivalSubId, subId, { ...values });
  };

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
              <Select placeholder='콘서트 이름을 선택해주세요.'>
                <Select.Option value="1일차">1일차</Select.Option>
                <Select.Option value="2일차">2일차</Select.Option>
                <Select.Option value="3일차">3일차</Select.Option>
                <Select.Option value="4일차">4일차</Select.Option>
              </Select>
            </Form.Item>

          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="startDate"
              label="콘서트 시작 시점"
              rules={[{ required: true }]}>
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
              rules={[{ required: true }]}>
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
              rules={[{ required: true, message: 'Please enter concert location' }]}
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
              rules={[{ required: true, message: 'please enter concert description' }]}
            >
              <Input.TextArea rows={4} placeholder="ex) 물을 지참해 주시기 바랍니다." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Flex justify='end'>
        <Button onClick={toggleLock}>
          {isLock ? <LockFilled /> : <UnlockOutlined />}
        </Button>
      </Flex>
    </>
  );
}

