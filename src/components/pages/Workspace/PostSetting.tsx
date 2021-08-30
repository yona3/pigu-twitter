import React, { useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { fetchBlackPosts, fetchPost, updateBlackPost } from '../../../lib/db';
import { blackPostsState, postsState } from '../../../state';
import { BlackPost, Post } from '../../../types';

export const PostSetting: VFC = () => {
  const params = useParams<{ id: string }>();
  const [posts, setPosts] = useRecoilState(postsState);
  const [post, setPost] = useState<Post | null>(null);
  const [blackPosts, setBlackPosts] = useRecoilState(blackPostsState);
  const [isBlackPost, setIsBlackPost] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPost = async (callback?: (post: Post) => void) => {
    try {
      const postDoc = await fetchPost(params.id);
      if (!postDoc.exists) throw new Error('Post not found');

      const post = postDoc.data() as Post;
      console.log('post: ', post);

      if (callback) callback(post);
      setPost(post);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch post
  useEffect(() => {
    if (!posts) {
      setIsLoading(true);
      // fetch posts
      handleFetchPost((post) => setPosts([post]));
    }

    if (posts && posts.length > 0 && !post) {
      const data = posts.filter(({ id }) => id === params.id)[0];
      console.log('data: ', data);
      if (!data) return console.log('Post not found');

      setPost(data);
    }
  }, [posts]);

  const handleFetchBlackPosts = async () => {
    try {
      const blackPostsSnapshot = await fetchBlackPosts();
      if (blackPostsSnapshot.empty) throw new Error('black posts is empty.');

      const blackPosts = blackPostsSnapshot.docs.map(
        (doc) => ({ ...doc.data(), postId: doc.id } as BlackPost)
      );
      console.log('blackPosts: ', blackPosts);
      setBlackPosts(blackPosts);
    } catch (err) {
      console.error(err);
    }
  };

  // black list
  useEffect(() => {
    if (!blackPosts) {
      handleFetchBlackPosts();
    } else {
      // check black posts
      const blackPost = blackPosts.filter(
        ({ postId }) => postId === params.id
      )[0];
      if (blackPost) {
        setIsBlackPost(true);
      } else {
        setIsBlackPost(false);
      }
    }
  }, [blackPosts]);

  const handleUpdate = async () => {
    try {
      if (!post) throw new Error('post is empty.');

      const query = isBlackPost ? 'remove' : 'add';
      if (query === 'add') {
        await updateBlackPost(params.id, query, {
          uid: post.uid,
          title: post.title,
        });
      } else {
        await updateBlackPost(params.id, query);
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">投稿内容の変更</h2>
      <hr className="mt-2 border-gray-300" />
      {post ? (
        <div>
          <div className="mt-6 space-y-6">
            <div className="flex">
              <span className="font-bold mr-4">Post ID:</span>
              <p>{post.id}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-4">User ID:</span>
              <p>{post.uid}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-4">Title:</span>
              <p>{post.title}</p>
            </div>
            <div className="flex flex-col">
              <span className="font-bold mr-4">Content:</span>
              <pre className="mt-2 whitespace-pre-wrap break-words font-sans">
                {post.content}
              </pre>
            </div>
          </div>

          {/* bottom */}
          <div className="mt-12 text-center">
            {isBlackPost !== null ? (
              <button
                className="
                  text-gray-400 border border-gray-600 
                  hover:bg-gray-100 hover:text-gray-700
                  px-6 py-2 rounded transition
                  font-semibold
                "
                onClick={handleUpdate}
              >
                {isBlackPost ? 'Remove Black List' : 'Add Black List'}
              </button>
            ) : (
              <p>check black list...</p>
            )}
          </div>
        </div>
      ) : isLoading ? (
        <div className="mt-4">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-600">404 not found</p>
        </div>
      )}
    </div>
  );
};
