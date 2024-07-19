import React from 'react';

const Skeleton = ({ width, height }: { width?: number; height?: number }) => {
  const keyframes = `
    @keyframes pulse {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#000000',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{keyframes}</style>
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(10, 10, 10, 1) 50%, rgba(0, 0, 0, 0) 100%)',
          animation: 'pulse 2s infinite',
        }}
      ></div>
    </div>
  );
};

export default Skeleton;
