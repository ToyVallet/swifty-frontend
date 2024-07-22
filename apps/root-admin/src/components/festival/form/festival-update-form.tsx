'use client';

import { LockButton, NotificationHandlerContext, Upload } from '@components';
import { FETCH_TAG } from '@lib';
import { http, revalidate } from '@swifty/shared-lib';
import type { FestivalDetail } from '@type';
import type { UploadFile } from 'antd';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useContext, useEffect, useState } from 'react';
import { useLock } from 'src/hooks';
import overCurrentDay from 'src/lib/util/over-current-day';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

interface FieldType {
  festivalId: string;
  name: string;
  addr: string;
  date: Date[];
  revealDate: Date[];
  description: string;
  thumbnail: UploadFile[];
  poster: UploadFile[];
}

interface Props extends FestivalDetail {
  form?: FormInstance<FieldType>;
  onClose?: () => void;
}

export default function FestivalUpdateForm({
  id,
  name,
  addr,
  startDate,
  endDate,
  revealEndDate,
  revealStartDate,
  description,
  poster,
  thumbnail,
  form,
  onClose,
}: Props) {
  const handleNotification = useContext(NotificationHandlerContext);

  const initailPoster: UploadFile[] = poster
    ? [
        {
          uid: '-1',
          name: '',
          status: 'done',
          url: poster,
        },
      ]
    : [];

  const initialThumbNail: UploadFile[] = thumbnail
    ? [
        {
          uid: '-1',
          name: '',
          status: 'done',
          url: thumbnail,
        },
      ]
    : [];

  const [isLock, toggleLock] = useLock(true);
  const [posterFile, setPosterFile] = useState<UploadFile[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);

  form?.setFieldValue('poster', posterFile);
  form?.setFieldValue('thumbnail', thumbnailFile);

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
    formData.append('festivalId', id);
    formData.append('description', values.description);

    // poster
    const posterFile = values.poster[0]!;
    if (posterFile.originFileObj) {
      formData.append(
        'newPoster',
        posterFile.originFileObj as RcFile,
        posterFile.name,
      );
    } else {
      formData.append('previousPoster', posterFile.url!);
    }

    // thumbNail
    const thumbnailFile = values.thumbnail[0]!;
    if (thumbnailFile.originFileObj) {
      formData.append(
        'newThumbnail',
        thumbnailFile.originFileObj as RcFile,
        thumbnailFile.name,
      );
    } else {
      formData.append('previousThumbnail', thumbnailFile.url!);
    }

    try {
      await http.patch('/host/admin/festival', formData, {
        credentials: 'include',
      });

      await revalidate(FETCH_TAG.festivalsDetail(id));
      toggleLock();
      onClose?.();
    } catch (err) {
      handleNotification(
        {
          message: '대학 축제 정보 수정에 실패하였습니다.',
          description: (err as Error).message,
        },
        'error',
      );
    }
  };

  // 데이터 초기 상태로 rollback
  useEffect(() => {
    if (!isLock) return;
    setPosterFile(initailPoster);
    setThumbnailFile(initialThumbNail);
    form?.setFieldsValue({
      name,
      addr,
      date: [dayjs(startDate), dayjs(endDate)],
      revealDate: [dayjs(revealStartDate), dayjs(revealEndDate)],
      description,
    });
  }, [isLock]);

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish} disabled={isLock}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Festival Title"
              rules={[
                { required: true, message: '대학명을 필수 기재해주세요' },
              ]}
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
              <RangePicker disabledDate={overCurrentDay} />
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
              <RangePicker disabledDate={overCurrentDay} />
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
                  required: false,
                  message: '학교 로고 이미지를 업로드 해주세요!',
                },
              ]}
            >
              <Upload fileList={posterFile} setFileList={setPosterFile} />
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
                  required: false,
                  message: '축제 썸네일 이미지를 업로드 해주세요!',
                },
              ]}
            >
              <Upload fileList={thumbnailFile} setFileList={setThumbnailFile} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <LockButton isLock={isLock} toggleLock={toggleLock} />
    </>
  );
}
