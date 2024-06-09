'use client';

import { useLineup } from '@app/hooks/festival/useLineup';
import { Upload } from '@components/festival';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { DatePickerProps, FormProps, UploadFile } from 'antd';
import { useState } from 'react';

type FieldType = {
  title: string;
  description: string;
  performanceTime: string;
  newFile: UploadFile;
}

export default function LineupCreateForm({
  concertSubId
}: { concertSubId: string }) {
  const [form] = Form.useForm();
  const { isLoading, createLineup } = useLineup(concertSubId);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => { };
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await createLineup({ ...values, newFile: fileList[0] });
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
            label="Title"
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
            label="Description"
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
            label="PeformanceTime"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <DatePicker onChange={onChange} placeholder="2024-05-28" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="newFile"
            label="NewFile"
          // rules={[{ required: true, message: 'Please choose the picutre' }]}
          >
            <Upload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
