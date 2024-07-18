import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NotificationProvider } from '@components';
import '@styles/global.css';
import '@styles/theme.css';
import '@swifty/ui/styles.css';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'swifty admin',
  description: 'swifty 어드민 관리자 페이지입니다.',
};

const darkTheme = {
  token: {
    colorPrimary: '#1967FF',
  },
  components: {
    Button: {},
    Menu: {
      colorPrimary: '#F8F8F8',
      itemHoverColor: '#F8F8F8',
      itemColor: '#DFE3FA',
      itemSelectedBg: '#1452cc',
      itemSelectedColor: '#F8F8F8',
      colorBgContainer: '#1967ff',
    },
    Layout: {
      siderBg: '#1967ff',
      headerPadding: '0 24px',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-Pretendard">
        <AntdRegistry>
          <ConfigProvider theme={darkTheme}>
            <NotificationProvider>{children}</NotificationProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
