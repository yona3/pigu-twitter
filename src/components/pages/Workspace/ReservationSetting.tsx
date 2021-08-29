import React, { useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useForm } from '../../../hooks/useForm';
import {
  deleteReservation,
  fetchReservations,
  Timestamp,
} from '../../../lib/db';
import { reservationsState } from '../../../state';
import { Tweet, TweetDocument } from '../../../types';
import { formatDateFromTimestamp } from '../../../utils/formatDateFromTimestamp';

export const ReservationSetting: VFC = () => {
  const params = useParams<{ id: string }>();
  const [reservations, setReservations] = useRecoilState(reservationsState);
  const [reservation, setReservation] = useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { form, setForm, handleChange } = useForm({
    text: '',
    tweetAt: '',
  });

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
    if (!reservations) {
      setIsLoading(true);
      handleFetchReservations();
    }

    if (reservations && reservations.length > 0 && !reservation) {
      const data = reservations.filter(
        ({ tweetId }) => tweetId === params.id
      )[0];
      if (!data) return;

      setReservation(data);
      setForm({
        text: data.text,
        tweetAt: formatDateFromTimestamp(data.tweetAt as Timestamp),
      });
    }
  }, [reservations]);

  const handleDelete = async () => {
    const result = confirm('Are you sure?');
    if (!result) return;

    try {
      await deleteReservation(params.id);
      window.location.href = '/';
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold">予約内容の変更</h2>
      <hr className="mt-2 border-gray-300" />
      {reservation ? (
        <div>
          <div className="mt-6 space-y-6">
            <div className="flex">
              <span className="font-bold mr-4">Tweet ID:</span>
              <p>{reservation.tweetId}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-4">Post ID:</span>
              <p>{reservation.postId}</p>
            </div>
            <div>
              <span className="font-bold mr-4">Tweet At:</span>
              <input
                className="
                border border-gray-300 py-1 px-2 rounded
                focus:outline-none
              "
                name="tweetAt"
                type="text"
                value={form.tweetAt}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold mr-4">Tweet Text:</span>
              <textarea
                className="
                mt-4 p-2 border border-gray-300 rounded
                focus:outline-none
              "
                name="text"
                rows={6}
                value={form.text}
                onChange={handleChange}
              />
              <div className="text-right mt-2 text-gray-500 text-sm">
                <span>{form.text.length} / 140</span>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="mt-6 text-center space-x-4 flex">
            <button
              className="
                text-red-400 border border-red-400 
                hover:bg-red-100 hover:text-red-700
                px-6 py-2 rounded transition w-1/2
                font-semibold
              "
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="
                text-blue-400 border border-blue-600 
                hover:bg-blue-100 hover:text-blue-700
                px-6 py-2 rounded transition w-1/2
                font-semibold
              "
            >
              Update
            </button>
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
