'use client';

import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useConcertCRUD } from '@hooks';
import { overCurrentDay } from '@lib';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import type { FormInstance } from 'antd/lib';

type FieldType = {
  name: string;
  rangeDateTime: string[];
  location: string;
  description: string;
};
interface Props {
  festivalId: string;
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function ConcertCreateForm({
  festivalId,
  form,
  onClose,
}: Props) {
  const { RangePicker } = DatePicker;
  const { isLoading, error, createConcert } = useConcertCRUD();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await createConcert(festivalId, values);
    if (!error) {
      form?.resetFields(Object.keys(values));
      onClose?.();
    }
  };

  if (isLoading) return <Loading3QuartersOutlined spin />;

  return (
    <Form form={form} id="concert-create" layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="콘서트 이름"
            rules={[{ required: true, message: '콘서트 명을 작성해주세요!' }]}
          >
            <Input placeholder="콘서트" />
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
