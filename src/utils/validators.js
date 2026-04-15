const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || typeof email !== 'string') return { valid: false, message: 'Email is required' };
  if (!EMAIL_REGEX.test(email)) return { valid: false, message: 'Invalid email format' };
  return { valid: true };
}

function validatePassword(password) {
  if (!password || typeof password !== 'string') return { valid: false, message: 'Password is required' };
  if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
  return { valid: true };
}

function validateUsername(username) {
  if (!username || typeof username !== 'string') return { valid: false, message: 'Username is required' };
  if (username.trim().length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
  return { valid: true };
}

module.exports = { validateEmail, validatePassword, validateUsername };
