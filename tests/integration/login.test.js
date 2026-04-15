const { expect } = require('chai');
const createApp = require('../../src/app');
const store = require('../../src/store');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');

describe('Integration: Login Page (POM)', () => {
  let app, loginPage, signupPage;

  beforeEach(async () => {
    app = createApp();
    store.clear();
    loginPage = new LoginPage(app);
    signupPage = new SignupPage(app);
    await signupPage.signup('testuser', 'test@example.com', 'secret123');
  });

  it('renders login page with form', async () => {
    await loginPage.visit();
    expect(loginPage.getStatus()).to.equal(200);
    expect(loginPage.hasLoginForm()).to.equal(true);
    expect(loginPage.getTitle()).to.equal('Login');
  });

  it('logs in with valid credentials', async () => {
    await loginPage.login('test@example.com', 'secret123');
    expect(loginPage.isLoggedIn()).to.equal(true);
  });

  it('shows error on wrong password', async () => {
    await loginPage.login('test@example.com', 'wrongpass');
    expect(loginPage.getStatus()).to.equal(401);
    expect(loginPage.getErrorMessage().toLowerCase()).to.include('invalid');
  });

  it('shows error for non-existing user', async () => {
    await loginPage.login('nobody@example.com', 'secret123');
    expect(loginPage.getStatus()).to.equal(401);
    expect(loginPage.getErrorMessage().toLowerCase()).to.include('does not exist');
  });

  it('shows required field errors on empty form', async () => {
    await loginPage.login('', '');
    expect(loginPage.getStatus()).to.equal(400);
    expect(loginPage.getErrorMessage().toLowerCase()).to.include('required');
  });

  it('shows validation error on invalid email format', async () => {
    await loginPage.login('notanemail', 'secret123');
    expect(loginPage.getStatus()).to.equal(400);
    expect(loginPage.getErrorMessage().toLowerCase()).to.include('invalid email');
  });
});
