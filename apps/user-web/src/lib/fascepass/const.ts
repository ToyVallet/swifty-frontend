import type { DirectionType } from '@lib/types/facepass';
import type { NonEmptyArray } from '@swifty/shared-lib';

export const STEP: NonEmptyArray<DirectionType> = [
  [0, '안면 등록을 위한\n 촬영을 시작할게요', null, ''],
  [0, '촬영된 사진은 안전하게\n 보안 처리 돼요', null, ''],
  [-0.45, 'right45', 'yaw', '안내선을 따라\n 얼굴을 오른쪽으로 돌려주세요'],
  [0.45, 'left45', 'yaw', '안내선을 따라\n 얼굴을 왼쪽으로 돌려주세요'],
  [0, 'front', 'yaw', '안내선을 따라\n 얼굴을 정면에 두세요'],
  [-0.25, 'up30', 'pitch', '안내선을 따라\n 얼굴을 위로 올려주세요'],
  [-0.45, 'up45', 'pitch', '안내선을 따라\n 얼굴을 위로 조금 더 올려주세요'],
];

export const MIN_DISTANCE = 0.3;
export const MAX_DISTANCE = 0.4;

export const ERROR_TEXT = [
  '얼굴을 화면 중앙에\n 위치 해주세요',
  '얼굴이 너무 멀어요\n적정 거리를 유지해주세요',
  '얼굴이 너무 가까워요\n 적정 거리를 유지해주세요',
  '얼굴을 정자세로\n 유지해주세요',
  '정면을 응시한 후\n 안내선 방향으로 움직여주세요',
] as const;
