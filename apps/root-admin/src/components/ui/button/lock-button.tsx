import { LockFilled, UnlockOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import type { FlexProps } from 'antd/lib';

interface Props {
  isLock: boolean;
  toggleLock: () => void;
  position?: FlexProps['justify'];
}
export default function LockButton({
  isLock,
  toggleLock,
  position = 'end',
}: Props) {
  return (
    <Flex justify={position}>
      <Button onClick={toggleLock}>
        {isLock ? <LockFilled /> : <UnlockOutlined />}
      </Button>
    </Flex>
  );
}
