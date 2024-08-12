'use client';

import type { DirectionType } from '@components/facepass/landmark';
import type * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import type { BoundingBox } from '@tensorflow-models/face-landmarks-detection/dist/shared/calculators/interfaces/shape_interfaces';

export function calculateCenter(box: BoundingBox, canvas: HTMLCanvasElement) {
  // 바운딩 박스의 원본 좌표와 크기
  const { xMin, xMax, yMin, yMax } = box;

  // 캔버스 크기
  const width_canvas = canvas.width;
  const height_canvas = canvas.height;

  // 바운딩 박스의 캔버스 상의 중심 좌표 계산
  const boxCenterX = (xMin + xMax) / 2;
  const boxCenterY = (yMin + yMax) / 2;

  // 캔버스의 중심 좌표
  const canvasCenterX = width_canvas / 2;
  const canvasCenterY = height_canvas / 2;
  return { boxCenterX, boxCenterY, canvasCenterX, canvasCenterY };
}

export function calculateFixedCenterSquaer(
  box: BoundingBox,
  canvas: HTMLCanvasElement,
) {
  const width = canvas.width;
  const height = canvas.height;

  const minX = width / 2 - box.width / 3;
  const minY = height / 2 - box.height / 3;
  const maxY = minY + box.height / 1.5;
  const maxX = minX + box.width / 1.5;

  return { minX, minY, maxX, maxY };
}

export function calculateFaceAngle(mesh: faceLandmarksDetection.Keypoint[]) {
  const radians = (a1: number, a2: number, b1: number, b2: number) =>
    Math.atan2(b2 - a2, b1 - a1);

  if (mesh[33] && mesh[10] && mesh[263] && mesh[152]) {
    return {
      roll: radians(mesh[33].x, mesh[33].y, mesh[263].x, mesh[263].y),
      yaw: radians(mesh[33].x, mesh[33].z!, mesh[263].x, mesh[263].z!),
      pitch: radians(mesh[10].y, mesh[10].z!, mesh[152].y, mesh[152].z!),
    };
  }

  return { roll: 0, yaw: 0, pitch: 0 };
}

export function calculateDistance(box: BoundingBox, canvas: HTMLCanvasElement) {
  const canvasDimesnions = canvas.width * canvas.height;
  const boxDimenssions = box.width * box.height;

  return Math.sqrt(boxDimenssions / canvasDimesnions);
}

export function condition(
  step: DirectionType,
  angle: {
    yaw: number;
    pitch: number;
    roll: number;
  },
) {
  const MARGIN_OF_ERROR = 0.1;
  const { yaw, pitch } = angle;
  const value = step[0];
  switch (step[1]) {
    case 'right':
      return (
        -yaw >= value - value * MARGIN_OF_ERROR &&
        -yaw <= value + value * MARGIN_OF_ERROR
      );
    case 'left':
      return (
        -yaw <= value - value * MARGIN_OF_ERROR &&
        -yaw >= value + value * MARGIN_OF_ERROR
      );
    case 'face':
      return yaw <= value + MARGIN_OF_ERROR && yaw >= value - MARGIN_OF_ERROR;

    case 'low-up':
      return (
        pitch <= value - value * MARGIN_OF_ERROR &&
        pitch >= value + value * MARGIN_OF_ERROR
      );

    case 'high-up':
      return (
        pitch <= value - value * MARGIN_OF_ERROR &&
        pitch >= value + value * MARGIN_OF_ERROR
      );
  }
}
