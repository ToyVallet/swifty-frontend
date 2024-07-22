'use client';

import { NotificationHandlerContext, Upload } from '@components';
import { http, revalidate } from '@swifty/shared-lib';
import type { University } from '@type';
import { Col, Form, Row } from 'antd';
import type { UploadFile } from 'antd/lib';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import { useContext, useState } from 'react';

type FieldType = {
  logo: UploadFile[];
};

interface Props {
  onClose?: () => void;
  form?: FormInstance<FieldType>;
  university: University;
}

export default function UniversityLogoUpdateForm({
  onClose,
  form,
  university,
}: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (university.logo)
      return [{ uid: 'prevLogo', url: university.logo, name: 'prevImage' }];
    return [];
  });
  form?.setFieldValue('logo', fileList);

  const handleNotification = useContext(NotificationHandlerContext);

  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const imageFile = values.logo[0]!;
    const formData = new FormData();

    formData.append('logo', imageFile.originFileObj as RcFile, imageFile.name);
    try {
      await http.post('/root/admin/university/{id}/logo', formData, {
        credentials: 'include',
        params: { id: university.id },
      });

      form?.resetFields(['logo']);
      await revalidate('university');
      onClose?.();
    } catch (err) {
      console.error(err);
      handleNotification(
        {
          message: '대학 로고 수정에 실패했습니다.',
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
            name="logo"
            label="University Logo"
            rules={[
              {
                required: true,
                message: '학교 로고 이미지를 업로드 해주세요!',
              },
            ]}
          >
            <Upload fileList={fileList} setFileList={setFileList} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
