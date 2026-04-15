const { expect } = require('chai');
const createApp = require('../../src/app');
const store = require('../../src/store');
const SignupPage = require('../pages/SignupPage');

describe('Integration: Signup Page (POM)', () => {
  let app, signupPage;

  beforeEach(() => {
    app = createApp();
    store.clear();
    signupPage = new SignupPage(app);
  });

  it('renders signup page with form', async () => {
    await signupPage.visit();
    expect(signupPage.getStatus()).to.equal(200);
    expect(signupPage.hasSignupForm()).to.equal(true);
    expect(signupPage.getTitle()).to.equal('Signup');
  });

  it('registers with valid data', async () => {
    await signupPage.signup('saad', 'saad@example.com', 'secret123');
    expect(signupPage.isSuccess()).to.equal(true);
    expect(signupPage.getSuccessMessage().toLowerCase()).to.include('successful');
  });

  it('shows validation errors on missing fields', async () => {
    await signupPage.signup('', '', '');
    expect(signupPage.getStatus()).to.equal(400);
    expect(signupPage.getErrorMessage().toLowerCase()).to.include('required');
  });

  it('shows error for short password', async () => {
    await signupPage.signup('saad', 'saad@example.com', '123');
    expect(signupPage.getStatus()).to.equal(400);
    expect(signupPage.getErrorMessage().toLowerCase()).to.include('password');
  });

  it('shows error for invalid email', async () => {
    await signupPage.signup('saad', 'bad-email', 'secret123');
    expect(signupPage.getStatus()).to.equal(400);
    expect(signupPage.getErrorMessage().toLowerCase()).to.include('email');
  });

  it('shows error for short username', async () => {
    await signupPage.signup('ab', 'saad@example.com', 'secret123');
    expect(signupPage.getStatus()).to.equal(400);
    expect(signupPage.getErrorMessage().toLowerCase()).to.include('username');
  });
});
