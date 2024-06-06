'use client';

import { API_AUTH } from '@lib/constant/api';
import { customFetch } from '@swifty/shared-lib';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

import styles from './login.module.css';

type FieldType = {
  formId?: string;
  password?: string;
};

export default function Page() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await customFetch(API_AUTH.login, {
      method: 'POST',
      body: JSON.stringify(values),
    });
    form.setFieldValue('formId', '');
    form.setFieldValue('password', '');
    router.replace('/');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main className={styles.main}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="아이디"
          name="formId"
          rules={[{ required: true, message: '아이디를 입력하세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="패스워드"
          name="password"
          rules={[{ required: true, message: '패스워드를 입력하세요' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
