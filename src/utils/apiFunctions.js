let users;
import(`../api/${process.env.NODE_ENV}/users`).then((module) => {
  users = module.users;
});

let schedules;
import(`../api/${process.env.NODE_ENV}/schedules`).then((module) => {
  schedules = module.schedules;
});

export const getUserData = (email) => {
  if (email in users) {
    return users[email];
  }
  return [];
};

export const updateNotification = (email, index) => {
  Object.defineProperties(users[email], {
    notifications: {
      writable: true,
    },
  });
  users[email].notifications[index].read = true;
  return users[email];
};

export const getSchedule = (date) => {
  if (date in schedules) {
    return schedules[date];
  }
  return [];
};
