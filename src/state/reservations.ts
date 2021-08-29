import { atom } from 'recoil';
import { Tweet } from '../types';

export const reservationsState = atom<Tweet[] | null>({
  key: 'reservationsState',
  default: null,
});
