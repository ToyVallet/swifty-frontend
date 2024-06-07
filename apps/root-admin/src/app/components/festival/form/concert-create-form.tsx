"use client";

import { customFetch } from '@/app/api';
import { API_CONCERT } from '@/constant';
import { Col, DatePicker, Form, Input, Row, TimePicker, DatePickerProps, FormProps } from 'antd';
import { useRouter } from 'next/navigation';

export default function ConcertCreateForm({ festivalSubId }: { festivalSubId: string }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  };

  type FieldType = {
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async () => {
    console.log('form', JSON.stringify(form));
    /*
      await customFetch(API_CONCERT.register, {
        method: 'POST',
        body: JSON.stringify({ values }),
      });
      form.setFieldValue('name', '');
      form.setFieldValue('dateTime', '');
      form.setFieldValue('time', '');
      form.setFieldValue('location', '');
      form.setFieldValue('description', '');
    */
    router.replace('/');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      hideRequiredMark
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="ex) 1일차" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dateTime"
            label="DateTime"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please choose the time' }]}
          >
            <TimePicker.RangePicker
              style={{ width: '100%' }}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="ex) 중앙 운동장" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'please enter url description',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="ex) 물 지참" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
