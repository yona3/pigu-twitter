export type TweetDocument = {
  postId: string;
  text: string;
  tweetAt: FirebaseFirestore.Timestamp | Date;
  createdAt: FirebaseFirestore.Timestamp | Date;
  updatedAt: FirebaseFirestore.FieldValue;
};

export type Tweet = {
  tweetId: string;
} & TweetDocument;
