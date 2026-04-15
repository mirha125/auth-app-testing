function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function randomEmail() {
  return `user_${randomString(6)}@example.com`;
}

function randomUser() {
  return {
    username: `user_${randomString(5)}`,
    email: randomEmail(),
    password: `Pass_${randomString(6)}`,
  };
}

module.exports = { randomString, randomEmail, randomUser };
