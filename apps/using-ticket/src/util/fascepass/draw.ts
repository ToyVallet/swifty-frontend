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

  console.log(image);
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
