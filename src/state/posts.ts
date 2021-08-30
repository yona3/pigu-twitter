import { atom } from 'recoil';
import { Post } from '../types';

export const postsState = atom<Post[] | null>({
  key: 'postsState',
  default: null,
});
