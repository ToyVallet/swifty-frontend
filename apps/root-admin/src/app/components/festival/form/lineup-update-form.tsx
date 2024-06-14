'use client';

import type { LineUpInfoResponse, LineUpStatus } from '@app/types/lineup';
import { Button, Col, DatePicker, Flex, Form, FormProps, Input, Row, UploadFile } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from 'react';
import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import Upload from '../upload';
import { useLineupCRUD } from '@app/hooks/festival';

dayjs.extend(updateLocale);
dayjs.updateLocale('ko_KR', { weekStart: 0 })

interface ILineupUpdateForm extends LineUpInfoResponse {
  isLock: boolean;
  toggleLock: () => void;
}

type FieldType = {
  title: string;
  description: string;
  performanceTime: string;
};

const LINEUP_STATUS = ['OPENED', 'HIDDEN'] as const;

export default function LineupUpdateForm({
  subId,
  title,
  description,
  performanceDate,
  lineUpImagePath,
  lineUpStatus,
  isLock,
  toggleLock,
}: ILineupUpdateForm) {
  const { isLoading, updateLineup } = useLineupCRUD();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '',
      status: 'done',
      url: lineUpImagePath
    },
  ]);
  const initialValues = {
    title: title,
    description: description,
    performanceTime: dayjs(performanceDate),
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await updateLineup(subId, values, fileList[0] as UploadFile, lineUpImagePath);
  };

  const onChangeStatus = (status: LineUpStatus) => {
    if (lineUpStatus === 'HIDDEN' && status === 'OPENED') {
      // open(subId);
      return;
    }
    // if (lineUpStatus === 'OPENED' && status === 'HIDDEN')
    // hidden(subId);
  }

  useEffect(() => {
    if (!isLock) return;
    form.setFieldsValue({
      title: title,
      description: description,
      performanceTime: dayjs(performanceDate),
    });
    setFileList([{
      uid: '-1',
      name: '',
      status: 'done',
      url: lineUpImagePath
    }]);
  }, [isLock]);

  return (
    <>
      <Form
        form={form}
        id='lineup-update'
        layout="vertical"
        initialValues={initialValues}
        disabled={isLock}
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
              <DatePicker
                locale={locale}
              />
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
      <Flex justify='end'>
        <Button onClick={toggleLock}>
          {isLock ? <LockFilled /> : <UnlockOutlined />}
        </Button>
      </Flex>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="라인업 상태"
            >
              <Flex justify='start' gap={24}>
                {LINEUP_STATUS.map((status) => (
                  <Button
                    size='large'
                    onClick={() => onChangeStatus(status)}
                    type={status === lineUpStatus ? 'primary' : 'dashed'}
                  >
                    {status}
                  </Button>
                ))}
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>

    </>
  );
}
