import type { ERROR_TEXT } from '@lib/fascepass';

export type DirectionType = readonly [
  number,
  (
    | 'right45'
    | 'left45'
    | 'front'
    | 'up30'
    | 'up45'
    | '안면 등록을 위한\n 촬영을 시작할게요'
    | '촬영된 사진은 안전하게\n 보안 처리 돼요'
  ),
  'yaw' | 'pitch' | null,
  (
    | ''
    | '안내선을 따라\n 얼굴을 왼쪽으로 돌려주세요'
    | '안내선을 따라\n 얼굴을 오른쪽으로 돌려주세요'
    | '안내선을 따라\n 얼굴을 위로 올려주세요'
    | '안내선을 따라\n 얼굴을 위로 조금 더 올려주세요'
    | '안내선을 따라\n 얼굴을 정면에 두세요'
  ),
];

export type FacePassImage = { src: string; name: string };

export type ErrorMessage = (typeof ERROR_TEXT)[number];
