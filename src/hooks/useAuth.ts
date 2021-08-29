import firebase from '../config/firebase';
import { useRecoilState } from 'recoil';
import { userStateObserver } from '../lib/auth';
import { isMeState, meState } from '../state';
import { useEffect } from 'react';
import { Me } from '../types';

export const useAuth = () => {
  const [me, setMe] = useRecoilState(meState);
  const [isMe, setIsMe] = useRecoilState(isMeState);
  const env = import.meta.env;

  useEffect(() => {
    userStateObserver((user: firebase.User | null) => {
      if (user && !me) {
        if (!user.displayName || !user.email)
          return console.log('name & email is undefined.');

        const data: Me = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        };

        if (env.VITE_MY_USER_ID === data.id) setIsMe(true);

        setMe(data);
      }

      if (!user && me) {
        setMe(null);
        setIsMe(false);
      }
    });
  }, []);

  return { me, isMe };
};
