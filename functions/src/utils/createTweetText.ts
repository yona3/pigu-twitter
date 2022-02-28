import { Post, User } from '../model';

export const createTweetText = (post: Post, user: User) => {
  const { title, id } = post;
  const { displayName, uid } = user;
  const shareLink = `https://pigu-ryu.web.app/${uid}/${id}/share`;
  return `${title}｜${displayName}\n\n#pigu #琉大 #春から琉大\n${shareLink}`;
};
