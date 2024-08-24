import type { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { createStore } from 'zustand/vanilla';

export type ModleStore = {
  model: FaceLandmarksDetector | null;
  setModel: (model: FaceLandmarksDetector) => void;
};

// zustand/vanilla로 store 생성
export const createModelStore = () =>
  createStore<ModleStore>((set) => ({
    model: null,
    setModel: (model) => set({ model }),
  }));
