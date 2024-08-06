import type { Face } from '@tensorflow-models/face-landmarks-detection';
import type { BoundingBox } from '@tensorflow-models/face-landmarks-detection/dist/shared/calculators/interfaces/shape_interfaces';

const rad2deg = (theat: number) => Math.round((theat * 180) / Math.PI);

export function drawGazeSpheres(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  box: BoundingBox,

  angle: {
    roll: number;
    yaw: number;
    pitch: number;
    distance: number;
  },
  color: string = 'pink',
) {
  ctx.strokeStyle = color;

  const { xMin, xMax, yMin, yMax, width, height } = box;

  const centerX = xMin + width / 2;
  const centerY = yMin + height / 2;

  const valX = centerX - (height * rad2deg(-angle.yaw)) / 90;
  const valY = centerY + (width * rad2deg(angle.pitch)) / 90;
  // Vertical path
  const pathV = new Path2D(`
      M ${centerX} ${yMin - 50}
      C
        ${valX} ${yMin},
        ${valX} ${yMax},
        ${centerX} ${yMax}
    `);

  // Horizontal path
  const pathH = new Path2D(`
      M ${xMin} ${centerY}
      C 
        ${xMin} ${valY},
        ${xMax} ${valY},
        ${xMax} ${centerY}
    `);
  ctx.stroke(pathH);
  ctx.stroke(pathV);
}

export function drawBoundingBox(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  box: BoundingBox,
  color = 'lime',
  lineWidth = 2,
) {
  // Set the stroke color and line width
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw the rectangle
  ctx.beginPath();
  ctx.rect(box.xMin, box.yMin - 50, box.width, box.yMax - box.yMin + 50);
  ctx.stroke();
}
