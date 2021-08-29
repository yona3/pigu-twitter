export type TweetRequestData = {
  postId: string;
  reserve?: {
    isReserved: boolean;
    deleteReserve: boolean;
    reserveId: string;
  };
};
