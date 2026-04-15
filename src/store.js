const users = new Map();

module.exports = {
  findByEmail: (email) => users.get((email || '').toLowerCase()),
  create: (user) => {
    users.set(user.email.toLowerCase(), user);
    return user;
  },
  clear: () => users.clear(),
  all: () => Array.from(users.values()),
};
