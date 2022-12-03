let users;
import(`../api/${process.env.NODE_ENV}/users`).then((module) => {
  users = module.users;
});

export const getUserData = (email) => {
  if (email in users) {
    return users[email];
  }
  return { data: 'No user found' };
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
