'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NotificationHandlerContext } from '@components';
import { http } from '@swifty/shared-lib';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import styles from './login.module.css';

type FieldType = {
  loginId?: string;
  password?: string;
};

export default function Page() {
  const [form] = Form.useForm();
  const handleNotification = useContext(NotificationHandlerContext);
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await http.post('/user/login', values);
      form.setFieldValue('loginId', '');
      form.setFieldValue('password', '');
      router.replace('/');
    } catch (err) {
      handleNotification(
        {
          message: '로그인에 실패하였습니다',
          description: '다시 시도해주세요!',
          placement: 'topRight',
          role: 'alert',
        },
        'error',
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.titleContainer}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5688 10.0635C14.4271 9.62539 13.2643 9.23481 12.1014 8.84248C9.91336 8.10179 7.71823 7.37694 5.71897 6.25624C4.90903 5.80233 4.14321 5.29211 3.43914 4.69921C2.13336 3.59786 1.1752 2.25196 0.681116 0.571788C0.62465 0.380019 0.617591 0.142507 0.344083 0C0.2735 0.226956 0.1888 0.408168 0.164096 0.589381C0.0105782 1.6573 -0.0564756 2.71819 0.0564571 3.76676C0.264677 5.69852 1.05697 7.31009 2.37864 8.63135C3.54325 9.79604 4.95315 10.6089 6.49715 11.2334C7.80999 11.7648 9.19165 12.1307 10.5521 12.5477C11.4291 12.8168 12.2902 13.1212 13.0843 13.5593C13.7531 13.927 14.3495 14.3756 14.7712 15.0213C13.8854 14.344 12.8637 13.9534 11.7697 13.6948C10.328 13.3534 8.88109 13.035 7.44649 12.6726C6.69655 12.4826 5.95366 12.2591 5.23724 11.9882C4.31261 11.6381 3.50443 11.0997 2.77566 10.4558C2.54803 10.2535 2.31335 10.0599 2.09454 9.87345C1.83691 9.95966 1.90044 10.1145 1.93926 10.2429C2.71743 12.8274 4.18556 14.8207 6.68949 15.945C7.69882 16.3989 8.76462 16.6927 9.8569 16.9425C10.6845 17.1325 11.5032 17.3524 12.3167 17.5829C12.832 17.7289 13.2855 17.9911 13.6754 18.3429C13.7566 18.4168 13.8219 18.5083 13.9895 18.7036C13.7425 18.6508 13.626 18.6491 13.5378 18.6051C12.5708 18.1107 11.5138 17.8644 10.4074 17.7377C9.69985 17.6568 8.99578 17.5583 8.29348 17.4615C7.10593 17.2979 6.04365 16.8932 5.1649 16.1297C5.05902 16.0382 4.93727 15.9643 4.8208 15.8851C4.80316 15.8728 4.77493 15.8763 4.74846 15.8728C4.58965 15.9432 4.60553 16.0646 4.64082 16.1825C4.8508 16.9073 5.21783 17.5372 5.68368 18.1072C6.66302 19.3071 7.95292 20.0706 9.45104 20.5474C9.86395 20.6794 10.2786 20.8096 10.6862 20.9556C10.8645 21.0207 11.0374 21.1086 11.1927 21.2124C11.5174 21.4306 11.6585 21.735 11.4927 22.1572C11.4556 22.2505 11.3533 22.3472 11.3285 22.4282C11.3991 22.6217 11.565 22.583 11.7079 22.5847C11.782 22.5847 11.8579 22.5689 11.932 22.5566C13.1055 22.3419 14.346 22.0552 15.4612 21.5608C17.464 20.6741 18.8121 19.1839 19.4526 17.1396C20.1214 15.0019 19.6856 13.174 18.2227 11.6979C17.4834 10.9502 16.564 10.4452 15.5759 10.067L15.5688 10.0635Z"
              fill="#1967FF"
            />
          </svg>
          <div className={styles.textCard}>
            <h1>Swifty Root Admin</h1>
            <span>스위프티 루트 관리자 시스템</span>
          </div>
        </div>
        <div className={styles.formContainer}>
          <Form
            form={form}
            name="basic"
            layout="horizontal"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="on"
            style={{
              width: 400,
            }}
          >
            <Form.Item<FieldType>
              name="loginId"
              rules={[{ required: true, message: '아이디를 입력하세요' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="아이디를 입력하세요"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '패스워드를 입력하세요' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="비밀번호를 입력하세요"
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" size="large" htmlType="submit">
                로그인
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <div>Swifty Admin</div>
          <div>
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5688 10.0635C14.4271 9.62539 13.2643 9.23481 12.1014 8.84248C9.91336 8.10179 7.71823 7.37694 5.71897 6.25624C4.90903 5.80233 4.14321 5.29211 3.43914 4.69921C2.13336 3.59786 1.1752 2.25196 0.681116 0.571788C0.62465 0.380019 0.617591 0.142507 0.344083 0C0.2735 0.226956 0.1888 0.408168 0.164096 0.589381C0.0105782 1.6573 -0.0564756 2.71819 0.0564571 3.76676C0.264677 5.69852 1.05697 7.31009 2.37864 8.63135C3.54325 9.79604 4.95315 10.6089 6.49715 11.2334C7.80999 11.7648 9.19165 12.1307 10.5521 12.5477C11.4291 12.8168 12.2902 13.1212 13.0843 13.5593C13.7531 13.927 14.3495 14.3756 14.7712 15.0213C13.8854 14.344 12.8637 13.9534 11.7697 13.6948C10.328 13.3534 8.88109 13.035 7.44649 12.6726C6.69655 12.4826 5.95366 12.2591 5.23724 11.9882C4.31261 11.6381 3.50443 11.0997 2.77566 10.4558C2.54803 10.2535 2.31335 10.0599 2.09454 9.87345C1.83691 9.95966 1.90044 10.1145 1.93926 10.2429C2.71743 12.8274 4.18556 14.8207 6.68949 15.945C7.69882 16.3989 8.76462 16.6927 9.8569 16.9425C10.6845 17.1325 11.5032 17.3524 12.3167 17.5829C12.832 17.7289 13.2855 17.9911 13.6754 18.3429C13.7566 18.4168 13.8219 18.5083 13.9895 18.7036C13.7425 18.6508 13.626 18.6491 13.5378 18.6051C12.5708 18.1107 11.5138 17.8644 10.4074 17.7377C9.69985 17.6568 8.99578 17.5583 8.29348 17.4615C7.10593 17.2979 6.04365 16.8932 5.1649 16.1297C5.05902 16.0382 4.93727 15.9643 4.8208 15.8851C4.80316 15.8728 4.77493 15.8763 4.74846 15.8728C4.58965 15.9432 4.60553 16.0646 4.64082 16.1825C4.8508 16.9073 5.21783 17.5372 5.68368 18.1072C6.66302 19.3071 7.95292 20.0706 9.45104 20.5474C9.86395 20.6794 10.2786 20.8096 10.6862 20.9556C10.8645 21.0207 11.0374 21.1086 11.1927 21.2124C11.5174 21.4306 11.6585 21.735 11.4927 22.1572C11.4556 22.2505 11.3533 22.3472 11.3285 22.4282C11.3991 22.6217 11.565 22.583 11.7079 22.5847C11.782 22.5847 11.8579 22.5689 11.932 22.5566C13.1055 22.3419 14.346 22.0552 15.4612 21.5608C17.464 20.6741 18.8121 19.1839 19.4526 17.1396C20.1214 15.0019 19.6856 13.174 18.2227 11.6979C17.4834 10.9502 16.564 10.4452 15.5759 10.067L15.5688 10.0635Z"
                fill="#1967FF"
              />
            </svg>
          </div>
          <div>스위프티 관리자</div>
        </div>
        <div>
          Copyright ©{new Date().getFullYear()} Produced by 주식회사
          스위프티코퍼레이션
        </div>
      </footer>
    </main>
  );
}
