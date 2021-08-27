export type SystemTweetReserve = {
  length: number;
  updatedAt: FirebaseFirestore.FieldValue;
};

export type SystemTweetInterval = {
  h: number;
  updatedAt: FirebaseFirestore.FieldValue;
};

export type SystemTweetEnableTime = {
  start: number;
  end: number;
  time: number; // end - start
  updatedAt: FirebaseFirestore.FieldValue;
};
