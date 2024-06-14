'use client';

import { Upload } from '@components';
import type { DatePickerProps } from 'antd';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { UploadFile } from 'antd/lib';
import { useState } from 'react';

export default function LineupCreateForm() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {};
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return (
    <Form layout="vertical">
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
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <Upload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
