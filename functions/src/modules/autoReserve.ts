import { Request, Response } from 'firebase-functions/v1';
import { FildValue, firestore } from '../lib/firebase';
import { Post, User } from '../model';
import { TweetDocument } from '../model/Tweet';
import { generateRandomNumber } from '../utils/generateRandomNumber';

export const autoReserve = async (_: Request, res: Response) => {
  try {
    // get random post id
    const indexDoc = await firestore.doc('index/v2').get();
    if (!indexDoc.exists) throw new Error("doc('index/v2') not found");

    const index = indexDoc.data() as { allPosts: string[] };
    if (!index) throw new Error("doc('index/v2') data is empty");

    const i = generateRandomNumber(0, index.allPosts.length - 1);
    const postId = index.allPosts[i];
    console.log('postId: ', postId);

    // get post
    const postDoc = await firestore.doc(`posts/${postId}`).get();
    if (!postDoc.exists) throw new Error('post not found');

    const post = postDoc.data() as Post;
    if (!post) throw new Error('post data is empty');

    // get user
    const userDoc = await firestore.doc(`users/${post.uid}`).get();
    if (!userDoc.exists) throw new Error('user not found');

    const user = userDoc.data() as User;
    if (!user) throw new Error('user data is empty');

    const shareLink = `https://pigu-ryu.web.app/${user.uid}/${postId}/share`;
    const tweetText = `${post.title}｜${user.displayName}\n\n#pigu #琉大\n${shareLink}`;

    const tweet: TweetDocument = {
      postId: post.id,
      text: tweetText,
      tweetAt: new Date(),
      createdAt: new Date(),
      updatedAt: FildValue.serverTimestamp(),
    };

    // reserve tweet
    await firestore.collection(`twitter/v1/tweet`).add(tweet);

    res.json('success!');
  } catch (err) {
    console.error(err);
    res.json('error!');
  }
};
