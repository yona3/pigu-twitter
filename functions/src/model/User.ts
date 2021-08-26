export type User = {
  uid: string;
  displayName: string;
  draft: {
    title: string;
    content: string;
  };
  like: string[];
  photoUrl: string;
  posts: string[];
  twitterName?: string;
  email?: string;
};
