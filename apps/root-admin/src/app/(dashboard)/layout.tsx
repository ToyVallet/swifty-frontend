import { AntdRegistry } from '@ant-design/nextjs-registry';
import { spaceGrotesk } from '@app/styles/font';
import '@app/styles/global.css';
import '@app/styles/theme.css';
import { Navigation } from '@components/ui';
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
      <AntdRegistry>
        <ConfigProvider theme={darkTheme}>
          <body className={spaceGrotesk.className}>
            <Navigation>{children}</Navigation>
          </body>
        </ConfigProvider>
      </AntdRegistry>
    </html>
  );
}
