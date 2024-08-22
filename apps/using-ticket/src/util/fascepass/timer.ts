'use client';

export default function timer(
  callback: () => void,
  time: number = 3000,
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        callback();
      } catch (error) {
        console.error('Error in callback:', error);
      } finally {
        resolve();
      }
    }, time);
  });
}
