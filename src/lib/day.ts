import dayjs from 'dayjs';

export const formatDate = (date: number, format: string) => {
  return dayjs(date).format(format);
};

export const generateDate = (date: string) => {
  return dayjs(date).toDate();
};
