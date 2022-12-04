import { notificationColors } from './constants';
import { scheduleColors } from './constants';

export const getNotificationColor = (type) => {
  return notificationColors[type] || notificationColors.default;
};

export const getScheduleColor = (type) => {
  return scheduleColors[type] || scheduleColors.inactive;
};
