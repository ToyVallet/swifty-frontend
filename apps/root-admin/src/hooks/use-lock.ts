'use client';

import { useState } from 'react';

export default function useLock(
  state = false,
): [boolean, () => void, () => void] {
  const [isLock, setIsLock] = useState<boolean>(state);
  const toggleLock = () => {
    setIsLock((prev) => !prev);
  };
  const lock = () => {
    setIsLock(true);
  };
  return [isLock, toggleLock, lock];
}
