'use client';

import { Upload } from '@components';
import { API_UNIVERSITY } from '@lib';
import { customFetch, revalidate } from '@swifty/shared-lib';
import type { University } from '@type';
import { Col, Form, Row } from 'antd';
import type { UploadFile } from 'antd/lib';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { RcFile } from 'antd/lib/upload';
import { useState } from 'react';

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

  const onFinish: FormProps<FieldType>['onFinish'] = async (
    values: FieldType,
  ) => {
    const imageFile = values.logo[0]!;
    const formData = new FormData();

    formData.append('logo', imageFile.originFileObj as RcFile, imageFile.name);
    await customFetch(API_UNIVERSITY.university_logo(university.subId), {
      method: 'POST',
      headers: {},
      body: formData,
    });
    form?.resetFields(['logo']);
    await revalidate('university');
    onClose?.();
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
