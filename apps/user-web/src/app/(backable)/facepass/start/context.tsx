import createStepContext from '@contexts/step-context';

export const facepassStep = ['start', 'camera'] as const;
export type FacePassStep = (typeof facepassStep)[number];

export const FacePassContext = createStepContext(facepassStep);
