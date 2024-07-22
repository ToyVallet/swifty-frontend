'use client';

import { http } from '@swifty/shared-lib';

import { DeleteButton } from '../ui';

function FlushButton() {
  const flushLogs = async () => {
    await http.delete('/log');
  };
  return (
    <DeleteButton
      onConfirm={flushLogs}
      title="로그 삭제"
      description="정말 진짜로 삭제 진짜 하시겠어요?"
    >
      로그 삭제
    </DeleteButton>
  );
}

export default FlushButton;
