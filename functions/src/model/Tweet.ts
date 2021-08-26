export type TweetDocument = {
  postId: string;
  text: string;
  tweetAt: Date;
  createdAt: Date;
  updatedAt: FirebaseFirestore.FieldValue;
};

export type Tweet = {
  tweetId: string;
} & TweetDocument;
