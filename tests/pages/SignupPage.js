const request = require('supertest');
const BasePage = require('./BasePage');

class SignupPage extends BasePage {
  constructor(app) {
    super(app);
    this.url = '/signup';
    this.selectors = {
      form: '#signup-form',
      username: '#username',
      email: '#email',
      password: '#password',
      signupBtn: '#signup-btn',
      error: '#error-msg',
      success: '#success-msg',
    };
  }

  async visit() {
    const res = await request(this.app).get(this.url);
    return this._load(res);
  }

  async signup(username, email, password) {
    const body = {};
    if (username !== undefined) body.username = username;
    if (email !== undefined) body.email = email;
    if (password !== undefined) body.password = password;
    const res = await request(this.app).post('/signup').type('form').send(body);
    return this._load(res);
  }

  isSuccess() { return this.getStatus() === 201 && this.getSuccessMessage().length > 0; }
  hasSignupForm() { return this.exists(this.selectors.form); }
}

module.exports = SignupPage;
