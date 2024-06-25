import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NotificationProvider } from '@components';
import { spaceGrotesk } from '@styles/font';
import '@styles/global.css';
import '@styles/theme.css';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'swifty admin',
  description: 'swifty 어드민 관리자 페이지입니다.',
};

const darkTheme = {
  token: {
    colorPrimary: '#7C5DFA',
  },
  components: {
    Button: {},
    Menu: {
      colorPrimary: '#F8F8F8',
      itemHoverColor: '#DFE3FA',
      itemColor: '#DFE3FA',
      itemHoverBg: '#252945',
      itemSelectedBg: '#252945',
      colorBgContainer: '#373B53',
    },
    Layout: {
      siderBg: '#373B53',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <AntdRegistry>
          <ConfigProvider theme={darkTheme}>
            <NotificationProvider>{children}</NotificationProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
