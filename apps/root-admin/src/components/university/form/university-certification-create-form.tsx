'use client';

import { NotificationHandlerContext, Upload } from '@components';
import { handleApiError } from '@lib';
import { APIError, http, revalidate } from '@swifty/shared-lib';
import type { UploadFile } from 'antd';
import { Col, Form, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import { useContext, useState } from 'react';

interface FieldType {
  id: string;
  exampleImage: UploadFile[];
}

interface Props {
  id: string;
  onClose?: () => void;
  form?: FormInstance<FieldType>;
}

export default function UniversityCertificationCreateForm({
  id,
  onClose,
  form,
}: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleNotification = useContext(NotificationHandlerContext);
  form?.setFieldValue('exampleImage', fileList);
  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const formData = new FormData();

    formData.append('id', id);

    if (values.exampleImage.length > 0) {
      const imageFile = values.exampleImage[0]!;
      formData.append(
        'exampleImage',
        imageFile.originFileObj as RcFile,
        imageFile.name,
      );
    }

    try {
      await http.post('/host/admin/certification', formData, {
        credentials: 'include',
      });

      form?.resetFields(['id', 'exampleImage']);
      setFileList([]);
      handleNotification({ message: '재학생 인증을 생성하였습니다.' });
      await revalidate('university-certificatin');
      onClose?.();
    } catch (err) {
      handleApiError(err, handleNotification);
    }
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={30}>
          <Col span={30}>
            <Form.Item
              name="exampleImage"
              label="University Certification Example Image"
              rules={[
                {
                  required: true,
                  message:
                    '학교 재학생 인증에 필요한 예시 이미지를 업로드 해주세요',
                },
              ]}
            >
              <Upload fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
