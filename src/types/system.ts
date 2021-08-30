export type BlackPostDoc = {
  uid: string;
  title: string;
};

export type BlackPost = {
  postId: string;
} & BlackPostDoc;
