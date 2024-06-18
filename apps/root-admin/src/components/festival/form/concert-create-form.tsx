'use client';

import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useConcertCRUD } from '@hooks';
import type { PropsWithClassName } from '@swifty/shared-lib';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { useRouter } from 'next/navigation';

type FieldType = {
  name: string;
  rangeDateTime: string[];
  location: string;
  description: string;
};

export default function ConcertCreateForm({
  festivalSubId,
}: { festivalSubId: string } & PropsWithClassName) {
  const { RangePicker } = DatePicker;
  const { isLoading, error, createConcert } = useConcertCRUD();
  const router = useRouter();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {};
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await createConcert(festivalSubId, values);
  };

  if (isLoading) return <Loading3QuartersOutlined spin />;

  return (
    <Form form={form} id="concert-create" layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="콘서트 이름"
            rules={[{ required: true }]}
          >
            <Select placeholder="콘서트 이름을 선택해주세요.">
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
            name="rangeDateTime"
            label="콘서트 시작 시점 - 콘서트 종료 시점"
            rules={[{ required: true }]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              locale={locale}
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
              {
                required: true,
                message: 'please enter concert description',
              },
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
  );
}
