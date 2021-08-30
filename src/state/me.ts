import { atom } from 'recoil';
import { Me } from '../types';

export const meState = atom<Me | null>({
  key: 'meState',
  default: null,
});
