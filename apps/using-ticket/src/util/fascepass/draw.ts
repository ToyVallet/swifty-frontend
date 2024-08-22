'use client';

import type { FacePassImage } from '@type';

import { calculateRadius } from './calculate';

export function drawMasking(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { x, y, radius } = calculateRadius(canvas);

  if (ctx) {
    // 원을 그리기
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();

    // 먼저 전체를 검정색으로 채우기
    ctx.fillStyle = '#f4f4ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 원 내부를 다시 흰색으로 채우기 (배경색이 흰색이라고 가정)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();

    // 다시 composite operation을 원래대로 되돌리기
    ctx.globalCompositeOperation = 'source-over';
  }
}

export function drawErrorCircle(canvas: HTMLCanvasElement) {
  const { radius, x, y } = calculateRadius(canvas);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff004d';
    ctx.lineWidth = 4;
    ctx.stroke();
  }
}

export async function saveImage(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  name: string,
): Promise<FacePassImage | null> {
  // OffscreenCanvas를 생성합니다.
  const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const offscreenCtx = offscreenCanvas.getContext('2d');
  let image: FacePassImage | null = null;

  if (offscreenCtx) {
    // OffscreenCanvas에 비디오 프레임을 그립니다.
    offscreenCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 비디오 프레임을 캡쳐합니다.

    const blob = await offscreenCanvas.convertToBlob();

    // FileReader로 Blob을 base64로 변환합니다.
    const base64data = await new Promise<string | ArrayBuffer | null>(
      (resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      },
    );

    image = { src: base64data as string, name };
  }

  return image;
}

export function resetCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function drawCircleAnimation(
  canvas: HTMLCanvasElement,
  color: string = 'blue',
  onComplete?: () => void,
  time = 1500,
) {
  let startTime: null | number = null;
  const totalTime = time;
  const ctx = canvas.getContext('2d');
  const { radius, x, y } = calculateRadius(canvas);
  const startAngle = (3 * Math.PI) / 2;
  // 애니메이션 함수
  function animate(timestamp: DOMHighResTimeStamp) {
    if (!startTime) startTime = timestamp; // 애니메이션 시작 시간을 초기화합니다.

    const progress = timestamp - startTime; // 현재 시간에서 시작 시간을 뺀 값을 사용해 진행률을 계산합니다.

    // 0에서 2*PI 사이의 각도 계산 (진행률에 따라)
    const endAngle = startAngle + (progress / totalTime) * 2 * Math.PI;

    if (ctx) {
      // 원 그리기
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.strokeStyle = color; // 외곽선 색상
      ctx.lineWidth = 6; // 외곽선 두께
      ctx.stroke();
    }

    // 애니메이션이 아직 완료되지 않았으면 다시 호출
    if (progress < totalTime) {
      requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  }

  // 애니메이션 시작
  requestAnimationFrame(animate);
}

export function drawXAnimation(
  canvas: HTMLCanvasElement,
  strokeStyle = '#ff005a',
  lineWidth = 20,
  speed = 0.02,
) {
  let progress = 0; // 애니메이션 진행 상태
  const { x: x, y: y } = calculateRadius(canvas);
  const offset = Math.min(canvas.width, canvas.height) / 4;
  const ctx = canvas.getContext('2d');

  // X자의 좌표 설정
  const startX1 = x - offset;
  const startY1 = y - offset;
  const endX1 = x + offset;
  const endY1 = y + offset;

  const startX2 = x + offset;
  const startY2 = y - offset;
  const endX2 = x - offset;
  const endY2 = y + offset;

  function drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    progress: number,
  ) {
    if (ctx) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(
        startX + (endX - startX) * progress,
        startY + (endY - startY) * progress,
      );
      ctx.stroke();
    }
  }

  function animate() {
    if (progress < 1) {
      drawLine(startX1, startY1, endX1, endY1, progress);
      drawLine(startX2, startY2, endX2, endY2, progress);
      progress += speed;
      requestAnimationFrame(animate); // 애니메이션 계속 실행
    } else {
      // 최종적으로 라인을 완전히 그리기
      drawLine(startX1, startY1, endX1, endY1, 1);
      drawLine(startX2, startY2, endX2, endY2, 1);
    }
  }

  // 애니메이션 시작
  animate();
}

export function drawCheckAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');

  // 원의 중심 좌표와 반지름 설정
  const { x, y } = calculateRadius(canvas);
  // 체크 표시 애니메이션 변수 설정
  let progress = 0; // 0부터 1까지의 진행 상황을 나타냄

  function drawCheckmark() {
    // 체크 표시 경로 설정
    const endX = canvas.width - (x + 70);
    const endY = y - 40;
    const midX = canvas.width - (x - 20);
    const midY = y + 30;
    const startX = canvas.width - (x - 50);
    const startY = y - 10;

    if (ctx) {
      // 체크 표시 그리기
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      // 진행 상황에 따라 선을 그리기
      if (progress <= 0.5) {
        // 첫 번째 선 그리기 (왼쪽 아래에서 오른쪽 위로)
        const currentX = startX + progress * 2 * (midX - startX);
        const currentY = startY + progress * 2 * (midY - startY);
        ctx.lineTo(currentX, currentY);
      } else {
        // 두 번째 선 그리기 (오른쪽 위에서 오른쪽 아래로)
        ctx.lineTo(midX, midY);
        const adjustedProgress = (progress - 0.5) * 2;
        const currentX = midX + adjustedProgress * (endX - midX);
        const currentY = midY + adjustedProgress * (endY - midY);
        ctx.lineTo(currentX, currentY);
      }

      ctx.lineWidth = 15;
      ctx.strokeStyle = '#007BFF';
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // 진행 상황 업데이트
    progress += 0.02;

    if (progress <= 1) {
      requestAnimationFrame(drawCheckmark);
    }
  }
  drawCheckmark();
}
