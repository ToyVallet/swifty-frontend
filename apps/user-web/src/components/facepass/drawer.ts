import type { DirectionType } from '@components/facepass/landmark';
import type { BoundingBox } from '@tensorflow-models/face-landmarks-detection/dist/shared/calculators/interfaces/shape_interfaces';

const rad2deg = (theat: number) => Math.round((theat * 180) / Math.PI);

export function drawGazeSpheres(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  angle: {
    roll: number;
    yaw: number;
    pitch: number;
  },
  canvas: HTMLCanvasElement,
  position: { radius: number; x: number; y: number },
  color: string = 'pink',
) {
  ctx.strokeStyle = color;
  if (canvas) {
    const width = canvas.width;
    const height = canvas.height;

    const videoCenterX = width / 2;
    const videoCenterY = height / 2;

    const videoValX = videoCenterX - (height * rad2deg(-angle.yaw)) / 200;
    const videoValY = videoCenterY + (width * rad2deg(angle.pitch)) / 200;
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
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  position: { radius: number; x: number; y: number },
  step: DirectionType,
  color: string = 'blue',
) {
  ctx.strokeStyle = color;

  if (canvas) {
    const width = canvas.width;
    const height = canvas.height;

    const videoCenterX = width / 2;
    const videoCenterY = height / 2;

    if (!step[1].includes('up')) {
      const videoValX = videoCenterX - (height * rad2deg(step[0])) / 200;
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

export function drawBoundingBox(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  box: BoundingBox,
  color = 'lime',
  lineWidth = 2,
) {
  const { xMin, xMax, yMax, yMin } = box;
  // Set the stroke color and line width
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw the rectangle
  ctx.beginPath();
  ctx.rect(box.xMin, box.yMin, box.width, box.yMax - box.yMin);
  ctx.arc((xMin + xMax) / 2, (yMin + yMax) / 2, 5, 0, 2 * Math.PI); // 중심에 원 그리기
  ctx.stroke();
}

export function drawFixedSquare(canvas: HTMLCanvasElement, box: BoundingBox) {
  const { width, height } = box;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(
      canvasWidth / 2 - width / 3,
      canvasHeight / 2 - height / 3,
      width / 1.5,
      height / 1.5,
    );
    ctx.stroke();
  }
}

export function drawCenterPoint(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 5; // 원의 반지름

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI); // 중심에 원 그리기
    ctx.fillStyle = 'red'; // 원 색상 설정
    ctx.fill(); // 원을 채움
  }
}

export function drawMasking(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.4;

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

  return { radius, x, y };
}
