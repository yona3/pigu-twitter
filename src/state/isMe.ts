import { atom } from 'recoil';

export const isMeState = atom<boolean>({
  key: 'isMeState',
  default: false,
});
