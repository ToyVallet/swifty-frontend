'use client';

import { useState } from 'react';
import { useLineupCRUD } from '@hooks/festival';
import { Upload } from '@components/festival';
import { Col, Form, Input, Row, TimePicker } from 'antd';
import type { DatePickerProps, FormProps, UploadFile } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';

type FieldType = {
  title: string;
  description: string;
  performanceTime: string;
}

export default function LineupCreateForm({
  concertSubId
}: { concertSubId: string }) {
  const [form] = Form.useForm();
  const { isLoading, createLineup } = useLineupCRUD();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => { };
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await createLineup(concertSubId, values, fileList[0] as UploadFile);
  };

  return (
    <Form
      form={form}
      id="lineup-create"
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="라인업 이름"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="아이유" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="라인업에 대한 설명"
            rules={[
              {
                required: true,
                message: 'please enter url description',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="선곡 : - 스물셋\n- Celebrity"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="performanceTime"
            label="라인업의 공연이 시작되는 시각"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <TimePicker onChange={onChange} locale={locale} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="newFile"
            label="라인업 이미지"
          >
            <Upload
              fileList={fileList}
              setFileList={setFileList}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
