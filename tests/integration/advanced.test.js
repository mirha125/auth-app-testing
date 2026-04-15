const { expect } = require('chai');
const createApp = require('../../src/app');
const store = require('../../src/store');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const { randomUser, randomString } = require('../utils/helpers');

describe('Integration: Advanced Scenarios (POM)', () => {
  let app, signupPage, loginPage;

  beforeEach(() => {
    app = createApp();
    store.clear();
    signupPage = new SignupPage(app);
    loginPage = new LoginPage(app);
  });

  it('1. rejects random garbage inputs as invalid', async () => {
    await signupPage.signup(randomString(2), 'notemail', randomString(3));
    expect(signupPage.getStatus()).to.equal(400);
  });

  it('2. accepts boundary values (username=3, password=6)', async () => {
    await signupPage.signup('abc', 'a@b.co', 'abcdef');
    expect(signupPage.isSuccess()).to.equal(true);
  });

  it('3. rejects below-boundary values (username=2, password=5)', async () => {
    await signupPage.signup('ab', 'a@b.co', 'abcde');
    expect(signupPage.getStatus()).to.equal(400);
  });

  it('4. accepts special characters in password', async () => {
    await signupPage.signup('specuser', 'spec@test.com', 'P@$$w0rd!#');
    expect(signupPage.isSuccess()).to.equal(true);
  });

  it('5. handles very long username (200 chars)', async () => {
    const longName = 'a'.repeat(200);
    await signupPage.signup(longName, 'long@test.com', 'secret123');
    expect([201, 400]).to.include(signupPage.getStatus());
  });

  it('6. rejects duplicate signups (rapid multiple submissions)', async () => {
    const user = randomUser();
    await signupPage.signup(user.username, user.email, user.password);
    await signupPage.signup(user.username, user.email, user.password);
    expect(signupPage.getStatus()).to.equal(409);
    expect(signupPage.getErrorMessage().toLowerCase()).to.include('already');
  });

  it('7. login is case-insensitive for email', async () => {
    await signupPage.signup('caseuser', 'Case@Test.com', 'secret123');
    await loginPage.login('case@test.com', 'secret123');
    expect(loginPage.isLoggedIn()).to.equal(true);
  });

  it('8. UI element locators exist on both pages', async () => {
    await loginPage.visit();
    expect(loginPage.exists('#email')).to.equal(true);
    expect(loginPage.exists('#password')).to.equal(true);
    expect(loginPage.exists('#login-btn')).to.equal(true);
    await signupPage.visit();
    expect(signupPage.exists('#username')).to.equal(true);
    expect(signupPage.exists('#email')).to.equal(true);
    expect(signupPage.exists('#password')).to.equal(true);
    expect(signupPage.exists('#signup-btn')).to.equal(true);
  });

  it('9. rejects whitespace-only username', async () => {
    await signupPage.signup('   ', 'ws@test.com', 'secret123');
    expect(signupPage.getStatus()).to.equal(400);
  });

  it('10. multiple rapid signup submissions with unique users all succeed', async () => {
    for (let i = 0; i < 5; i++) {
      const u = randomUser();
      await signupPage.signup(u.username, u.email, u.password);
      expect(signupPage.isSuccess()).to.equal(true);
    }
  });
});
