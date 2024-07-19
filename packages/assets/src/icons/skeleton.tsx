import React from 'react';

const Skeleton = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <div
      style={{
        width,
        height,
      }}
    />
  );
};

export default Skeleton;
