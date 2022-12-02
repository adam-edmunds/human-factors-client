import { notificationColors } from './constants';

export const getNotificationColor = (type) => {
  return notificationColors[type] || notificationColors.default;
};
