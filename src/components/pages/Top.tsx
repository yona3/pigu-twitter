import React, { useEffect, useState, VFC } from 'react';
import { useRecoilState } from 'recoil';
import { useAuth } from '../../hooks/useAuth';
import { signInWithGoogle } from '../../lib/auth';
import { fetchReservations } from '../../lib/db';
import { reservationsState } from '../../state/atoms';
import { Tweet, TweetDocument } from '../../types';
import { Layout } from '../shared/Layout';
import { TweetCard } from '../shared/TweetCard';

export const Top: VFC = () => {
  const { me, isMe } = useAuth();
  const [reservations, setReservations] = useRecoilState(reservationsState);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchReservations = async () => {
    try {
      const tweetSnapshot = await fetchReservations();
      if (tweetSnapshot.empty) throw new Error('No tweet found');
      let result: Tweet[] = [];
      if (tweetSnapshot.docs.length > 0) {
        tweetSnapshot.docs.forEach((doc) => {
          const tweet = doc.data() as TweetDocument;
          result = [...result, { ...tweet, tweetId: doc.id }];
        });
      }
      console.log('result :', result);
      setReservations(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (me && isMe && !reservations && !isLoading) {
      setIsLoading(true);
      console.log('fetch reservations');
      handleFetchReservations();
    }
  }, [me, isMe, reservations]);

  return (
    <Layout>
      {me && isMe ? (
        <>
          {reservations && reservations.length > 0 ? (
            // fetch reservations success
            <>
              <h1 className="text-lg sm:text-xl text-center">Reservations</h1>
              <div className="space-y-5 mt-10">
                {reservations.map((tweet) => (
                  <div key={tweet.tweetId}>
                    <TweetCard tweet={tweet} />
                  </div>
                ))}
              </div>
            </>
          ) : isLoading ? (
            // loading
            <div className="text-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            // no reservations
            <div className="text-center">
              <h1 className="text-lg sm:text-xl">Reservations</h1>
              <p className="mt-4 text-gray-500">You have no reservations.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl">
            This is pigu official twitter management page 👋
          </h3>
          <button
            className="
              mt-2 text-base text-blue-500 
              hover:underline transition
            "
            onClick={signInWithGoogle}
          >
            Login
          </button>
        </div>
      )}
    </Layout>
  );
};
