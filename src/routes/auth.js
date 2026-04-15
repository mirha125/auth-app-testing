const express = require('express');
const router = express.Router();
const store = require('../store');
const { validateEmail, validatePassword, validateUsername } = require('../utils/validators');

router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (errors.length) return res.status(400).render('login', { error: errors.join(', '), success: null });

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return res.status(400).render('login', { error: emailCheck.message, success: null });

  const user = store.findByEmail(email);
  if (!user) return res.status(401).render('login', { error: 'User does not exist', success: null });
  if (user.password !== password) return res.status(401).render('login', { error: 'Invalid credentials', success: null });

  req.session.user = { email: user.email, username: user.username };
  res.status(200).render('dashboard', { user: req.session.user });
});

router.get('/signup', (req, res) => {
  res.render('signup', { error: null, success: null });
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const errors = [];
  if (!username) errors.push('Username is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (errors.length) return res.status(400).render('signup', { error: errors.join(', '), success: null });

  const uCheck = validateUsername(username);
  if (!uCheck.valid) return res.status(400).render('signup', { error: uCheck.message, success: null });
  const eCheck = validateEmail(email);
  if (!eCheck.valid) return res.status(400).render('signup', { error: eCheck.message, success: null });
  const pCheck = validatePassword(password);
  if (!pCheck.valid) return res.status(400).render('signup', { error: pCheck.message, success: null });

  if (store.findByEmail(email)) {
    return res.status(409).render('signup', { error: 'User already exists', success: null });
  }
  store.create({ username: username.trim(), email: email.toLowerCase(), password });
  res.status(201).render('signup', { error: null, success: 'Signup successful! You can now log in.' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
