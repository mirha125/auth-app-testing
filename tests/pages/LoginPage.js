const request = require('supertest');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(app) {
    super(app);
    this.url = '/login';
    this.selectors = {
      form: '#login-form',
      email: '#email',
      password: '#password',
      loginBtn: '#login-btn',
      error: '#error-msg',
      signupLink: '#signup-link',
    };
  }

  async visit() {
    const res = await request(this.app).get(this.url);
    return this._load(res);
  }

  async login(email, password) {
    const body = {};
    if (email !== undefined) body.email = email;
    if (password !== undefined) body.password = password;
    const res = await request(this.app).post('/login').type('form').send(body);
    return this._load(res);
  }

  isLoggedIn() { return this.getStatus() === 200 && this.getTitle() === 'Welcome'; }
  hasLoginForm() { return this.exists(this.selectors.form); }
}

module.exports = LoginPage;
