import { atom } from 'recoil';
import { BlackPost } from '../types';

export const blackPostsState = atom<BlackPost[] | null>({
  key: 'blackPostsState',
  default: null,
});
