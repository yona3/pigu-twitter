export type Post = {
  id: string;
  uid: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: number;
  like: number;
  comment: number;
  postImage?: string | null;
  editAt?: number;
};
