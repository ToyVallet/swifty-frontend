import type { DirectionType, FacePassImage } from '@lib/types';

import { calculateRadius } from './calculate';

const rad2deg = (theat: number) => Math.round((theat * 180) / Math.PI);

export function drawGazeSpheres(
  canvas: HTMLCanvasElement,
  angle: {
    roll: number;
    yaw: number;
    pitch: number;
  },

  position: { radius: number; x: number; y: number },
  color: string = 'pink',
) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const videoCenterX = width / 2;
  const videoCenterY = height / 2;

  const videoValX = videoCenterX - (height * rad2deg(-angle.yaw)) / 200;
  const videoValY = videoCenterY + (width * rad2deg(angle.pitch)) / 200;

  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    const pathVideoV = new Path2D(
      `M ${videoCenterX} ${height / 2 - position.radius}
      C
        ${videoValX} ${0},
        ${videoValX} ${height},
        ${videoCenterX} ${height - (height - 2 * position.radius) / 2}
    `,
    );
    const pathVideoH = new Path2D(
      `M ${width / 2 - position.radius} ${videoCenterY}
      C 
        ${0} ${videoValY},
        ${width} ${videoValY},
        ${width - (width - 2 * position.radius) / 2} ${videoCenterY}
    `,
    );

    ctx.stroke(pathVideoH);
    ctx.stroke(pathVideoV);
  }
}

export function drawNextPosition(
  canvas: HTMLCanvasElement,
  position: { radius: number; x: number; y: number },
  step: DirectionType,
  color: string = 'blue',
) {
  const width = canvas.width;
  const height = canvas.height;

  const videoCenterX = width / 2;
  const videoCenterY = height / 2;

  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    if (!step[1].includes('up')) {
      const videoValX = videoCenterX - (height * rad2deg(-step[0])) / 200;
      const pathVideoV = new Path2D(
        `M ${videoCenterX} ${height / 2 - position.radius}
      C
        ${videoValX} ${0},
        ${videoValX} ${height},
        ${videoCenterX} ${height - (height - 2 * position.radius) / 2}
    `,
      );

      ctx.stroke(pathVideoV);
    }

    if (step[1].includes('up')) {
      const videoValY = videoCenterY + (width * rad2deg(step[0])) / 200;
      const pathVideoH = new Path2D(
        `M ${width / 2 - position.radius} ${videoCenterY}
      C 
        ${0} ${videoValY},
        ${width} ${videoValY},
        ${width - (width - 2 * position.radius) / 2} ${videoCenterY}
    `,
      );
      ctx.stroke(pathVideoH);
    }
  }
}

export function drawMasking(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { x, y, radius } = calculateRadius(canvas);

  if (ctx) {
    // 원을 그리기
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();

    // 먼저 전체를 검정색으로 채우기
    ctx.fillStyle = 'black';
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

export function saveImage(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  name: string,
  images: FacePassImage[],
) {
  // OffscreenCanvas를 생성합니다.
  const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  const offscreenCtx = offscreenCanvas.getContext('2d');

  if (offscreenCtx) {
    // OffscreenCanvas에 비디오 프레임을 그립니다.

    offscreenCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 비디오 프레임을 캡쳐합니다.

    offscreenCanvas.convertToBlob().then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (typeof base64data === 'string') {
          images.push({ src: base64data, name });
        }
      };
    });
  }
}

export function drawInnerCircle(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { radius, x, y } = calculateRadius(canvas);
  if (ctx) {
    ctx.strokeStyle = '#404040';
    ctx.fillStyle = '#404040';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.fill();
    ctx.stroke();
  }
}

export function drawCircleAnimation(
  canvas: HTMLCanvasElement,
  color: string = 'blue',
  onComplete?: () => void,
) {
  let startTime: null | number = null;
  const totalTime = 1500;
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

export function drawText(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;

  const { x, y } = calculateRadius(canvas); // x, y가 canvas의 중앙 위치로 설정된 상태
  if (ctx) {
    ctx.translate(width, 0); // 캔버스의 x축을 반전
    ctx.scale(-1, 1); // 수평 방향으로 뒤집기
    ctx.font = 'bold 26px pretendard';
    ctx.fillStyle = 'white';

    // 텍스트를 줄 단위로 나누기
    const lines = text.split('\n');
    const lineHeight = 30; // 줄 간격 (글꼴 크기와 조절)

    // 각 라인별 적정 width 계산
    const lineWithWidth = lines.map((line) => ({
      text: line,
      width: x - ctx.measureText(line).width / 2,
    }));

    // 텍스트의 총 높이 계산
    const textHeight = lines.length * lineHeight;

    // 텍스트 상단에 추가 공간을 마련하기 위해 y 좌표 조정
    const textY = y - textHeight / 2 + lineWithWidth.length * 13; // 기존 y 좌표보다 위로 올리기 위해 30 픽셀 조정

    // 여러 줄 텍스트 그리기
    lineWithWidth.forEach(({ text, width }, index) => {
      ctx.fillText(text, width, textY + index * lineHeight);
    });

    // 축 원상 복귀
    ctx.translate(width, 0); // 캔버스의 x축을 반전
    ctx.scale(-1, 1); // 수평 방향으로 뒤집기
  }
}
