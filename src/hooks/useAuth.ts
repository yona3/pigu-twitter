import firebase from '../config/firebase';
import { useRecoilState } from 'recoil';
import { userStateObserver } from '../lib/auth';
import { meState } from '../state/atoms';
import { useEffect } from 'react';
import { Me } from '../types';

export const useAuth = () => {
  const [me, setMe] = useRecoilState(meState);

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

        setMe(data);
      }

      if (!user && me) setMe(null);
    });
  }, []);

  return { me };
};
