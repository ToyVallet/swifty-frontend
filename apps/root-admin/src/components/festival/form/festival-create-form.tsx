'use client';

import { NotificationHandlerContext, Upload } from '@components';
import { FETCH_TAG } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useContext, useState } from 'react';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

interface FieldType {
  universityId: string;
  name: string;
  addr: string;
  date: Date[];
  revealDate: Date[];
  description: string;
  thumbnail: UploadFile[];
  poster: UploadFile[];
}

interface Props {
  id: string;
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function FestivalForm({ id, form, onClose }: Props) {
  const [poster, setPoster] = useState<UploadFile[]>([]);
  const [thumbnail, setThumbnail] = useState<UploadFile[]>([]);
  const handleNotification = useContext(NotificationHandlerContext);

  form?.setFieldValue('poster', poster);
  form?.setFieldValue('thumbnail', thumbnail);

  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const formData = new FormData();

    formData.append('startDate', dayjs(values.date[0]).format(FORMAT));
    formData.append('endDate', dayjs(values.date[1]).format(FORMAT));

    formData.append(
      'revealStartDate',
      dayjs(values.revealDate[0]).format(FORMAT),
    );
    formData.append(
      'revealEndDate',
      dayjs(values.revealDate[1]).format(FORMAT),
    );

    formData.append('name', values.name);
    formData.append('addr', values.addr);
    formData.append('id', id);
    formData.append('description', values.description);

    // poster & thumbnail
    const posterFile = values.poster[0]!;
    formData.append(
      'poster',
      posterFile.originFileObj as RcFile,
      posterFile.name,
    );

    const thumbnailFile = values.thumbnail[0]!;
    formData.append(
      'thumbnail',
      thumbnailFile.originFileObj as RcFile,
      thumbnailFile.name,
    );
    try {
      await http.post('/host/admin/festival', formData, {
        credentials: 'include',
        headers: {},
      });

      await revalidate(FETCH_TAG.festivals);
      setPoster([]);
      setThumbnail([]);
      form?.resetFields();
      onClose?.();
    } catch (err) {
      handleNotification(
        {
          message: '대학  축제 생성에 실패했습니다!',
          description: (err as Error).message,
        },
        'error',
      );
    }
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Festival Title"
            rules={[{ required: true, message: '대학명을 필수 기재해주세요' }]}
          >
            <Input placeholder="축제 이름을 작성해주세요" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="addr"
            label="Address"
            rules={[{ required: true, message: '축제 위치를 기입해주세요' }]}
          >
            <Input placeholder="서울특별시 마포구" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="축제 설명"
            rules={[{ required: false, message: '축제' }]}
          >
            <TextArea
              placeholder="대학 축제에 관한 짧은 설명을 작성(300자)"
              maxLength={300}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="기간"
            rules={[
              {
                required: true,
                message: '축제 기간을 설정해주세요',
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="revealDate"
            label="공개 기간"
            rules={[
              {
                required: true,
                message: '축제 공개 기간을 설정해주세요',
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="poster"
            label="축제 포스터"
            rules={[
              {
                required: true,
                message: '학교 로고 이미지를 업로드 해주세요!',
              },
            ]}
          >
            <Upload fileList={poster} setFileList={setPoster} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="thumbnail"
            label="축제 썸네일"
            rules={[
              {
                required: true,
                message: '축제 썸네일 이미지를 업로드 해주세요!',
              },
            ]}
          >
            <Upload fileList={thumbnail} setFileList={setThumbnail} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
