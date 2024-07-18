'use client';

import { Upload } from '@components';
import { useLineupCRUD } from '@hooks';
import { FETCH_TAG } from '@lib';
import { revalidate } from '@swifty/shared-lib';
import { Col, Form, Input, Row, TimePicker } from 'antd';
import type { FormProps, UploadFile } from 'antd';
import type { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import { useState } from 'react';

type FieldType = {
  title: string;
  description: string;
  performanceTime: Date;
  newFile: UploadFile[];
};

interface Props {
  concertId: string;
  festivalId: string;
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function LineupCreateForm({
  concertId,
  festivalId,
  form,
  onClose,
}: Props) {
  const { createLineup, error } = useLineupCRUD();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await createLineup(concertId, values, fileList[0] as UploadFile);
    if (!error) {
      await revalidate(FETCH_TAG.festivalsDetail(festivalId));
      form?.resetFields(Object.keys(values));
      setFileList([]);
      onClose?.();
    }
  };

  return (
    <Form form={form} id="lineup-create" layout="vertical" onFinish={onFinish}>
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
            <TimePicker defaultValue={dayjs('00:00:00', 'HH:mm:ss')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="newFile" label="라인업 이미지">
            <Upload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
