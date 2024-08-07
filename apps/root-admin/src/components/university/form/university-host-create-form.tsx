'use client';

import { NotificationHandlerContext } from '@components';
import { FETCH_TAG } from '@lib';
import { APIError, http, revalidate } from '@swifty/shared-lib';
import type { UniversityHostCreate } from '@type';
import { Col, Form, Input, Radio, Row } from 'antd';
import { Modal } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form';
import { useContext, useState } from 'react';

import styles from './university-host-create-form.module.css';

interface FieldType {
  phoneNumber: string;
  loginId: string;
  userRole: 'MANAGER' | 'SUB_MANAGER' | 'CLIENT';
  id: string;
}

interface Props {
  id: string;
  onClose?: () => void;
  form?: FormInstance<FieldType>;
}

export default function UniversityHostCreateForm({ onClose, form, id }: Props) {
  const [modal, setModal] = useState(false);
  const handleNotification = useContext(NotificationHandlerContext);

  const [hostUserInfo, sethostUserInfo] = useState({
    id: '',
    pw: '',
    role: '',
  });

  const onOk = () => {
    setModal(false);
    sethostUserInfo({ id: '', pw: '', role: '' });

    onClose?.();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    values.id = id;
    const body = { ...values };
    try {
      const data = await http.post<UniversityHostCreate>(
        '/root/admin/host',
        body,
        {
          credentials: 'include',
        },
      );

      await revalidate(FETCH_TAG.hostUsers);
      sethostUserInfo({
        id: data.loginId,
        pw: data.password,
        role: values.userRole,
      });
      form?.resetFields(['phoneNumber', 'loginId', 'userRole']);
      setModal(true);
    } catch (err) {
      if (APIError.isAPIError(err)) {
        handleNotification(
          {
            message: 'host 유저 생성에 실패하였습니다.',
            description: err.message,
          },
          'error',
        );
      }
    }
  };
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="USER ROLE"
              name="userRole"
              rules={[
                { required: true, message: 'Host 계정의 권한을 설정해주세요' },
              ]}
            >
              <Radio.Group>
                <Radio value="MANAGER">MANAGER</Radio>
                <Radio value="SUB_MANAGER">SUB_MANAGER</Radio>
                <Radio value="CLIENT">CLIENT</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="loginId"
              label="ID"
              rules={[
                { required: true, message: 'Host 계정 ID를 입력해주세요' },
              ]}
            >
              <Input placeholder="Host Id" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="PHONE NUMBER"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                placeholder="phonenumber"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        title={<p>Host 유저가 생성되었습니다</p>}
        open={modal}
        onOk={onOk}
        onCancel={() => setModal(false)}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
      >
        <div className={styles.modalContent}>
          <p>ID : {hostUserInfo.id}</p>
          <p>PASSWORD : {hostUserInfo.pw}</p>
          <p>USER ROLE : {hostUserInfo.role}</p>
        </div>
      </Modal>
    </>
  );
}
