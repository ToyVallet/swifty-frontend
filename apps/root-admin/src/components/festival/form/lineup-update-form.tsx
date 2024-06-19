'use client';

import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import { Upload } from '@components';
import { useLineupCRUD, useLock } from '@hooks';
import { FETCH_TAG } from '@lib';
import { revalidate } from '@swifty/shared-lib';
import type { LineUpInfoResponse } from '@type';
import { Button, Col, Flex, Form, Input, Row, TimePicker } from 'antd';
import type { FormProps, UploadFile } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import type { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from 'react';

dayjs.extend(updateLocale);
dayjs.updateLocale('ko_KR', { weekStart: 0 });

type FieldType = {
  title: string;
  description: string;
  performanceTime: Date;
  newFile: UploadFile[];
  previousFile: string;
};

interface Props extends LineUpInfoResponse {
  festivalSubId: string;
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function LineupUpdateForm({
  subId,
  title,
  description,
  performanceTime,
  lineUpImagePath,
  festivalSubId,
  form,
  onClose,
}: Props) {
  const [lock, toggleLock] = useLock();
  const { updateLineup, error } = useLineupCRUD();
  const fileInitialValue: UploadFile[] = lineUpImagePath
    ? [
        {
          uid: '-1',
          name: '',
          status: 'done',
          url: lineUpImagePath,
        },
      ]
    : [];

  const [fileList, setFileList] = useState<UploadFile[]>(() => []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await updateLineup(
      subId,
      values,
      fileList[0] as UploadFile,
      lineUpImagePath ? lineUpImagePath : '',
    );
    if (!error) {
      await revalidate(FETCH_TAG.festivalsDetail(festivalSubId));
      onClose?.();
    }
  };

  // 데이터 초기 상태로 rollback
  useEffect(() => {
    if (!lock) return;
    setFileList(fileInitialValue);
    form?.setFieldsValue({
      title,
      performanceTime: dayjs(performanceTime, 'HH:mm:ss'),
      description,
      newFile: fileList,
    });
  }, [lock]);

  return (
    <>
      <Form
        form={form}
        id="lineup-update"
        layout="vertical"
        disabled={lock}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="라인업 이름"
              rules={[
                { required: true, message: 'Please enter the lineup name' },
              ]}
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
                { required: true, message: 'Please enter a description' },
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
              rules={[
                {
                  required: true,
                  message: 'Please choose the performance time',
                },
              ]}
            >
              <TimePicker locale={locale} format="HH:mm:ss" />
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
      <Flex justify="end">
        <Button onClick={toggleLock}>
          {lock ? <LockFilled /> : <UnlockOutlined />}
        </Button>
      </Flex>
    </>
  );
}
