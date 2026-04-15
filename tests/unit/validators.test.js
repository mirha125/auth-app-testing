const { expect } = require('chai');
const { validateEmail, validatePassword, validateUsername } = require('../../src/utils/validators');

describe('Unit: Email Validation', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('user@example.com').valid).to.equal(true);
  });
  it('rejects email missing @ symbol', () => {
    expect(validateEmail('userexample.com').valid).to.equal(false);
  });
  it('rejects email missing domain', () => {
    expect(validateEmail('user@').valid).to.equal(false);
  });
  it('rejects empty email', () => {
    expect(validateEmail('').valid).to.equal(false);
  });
  it('rejects null email', () => {
    expect(validateEmail(null).valid).to.equal(false);
  });
});

describe('Unit: Password Validation', () => {
  it('accepts valid password (>= 6 chars)', () => {
    expect(validatePassword('secret1').valid).to.equal(true);
  });
  it('accepts boundary 6-char password', () => {
    expect(validatePassword('abcdef').valid).to.equal(true);
  });
  it('rejects short password (< 6 chars)', () => {
    expect(validatePassword('abc').valid).to.equal(false);
  });
  it('rejects empty password', () => {
    expect(validatePassword('').valid).to.equal(false);
  });
});

describe('Unit: Username Validation', () => {
  it('accepts valid username (>= 3 chars)', () => {
    expect(validateUsername('saad').valid).to.equal(true);
  });
  it('accepts boundary 3-char username', () => {
    expect(validateUsername('abc').valid).to.equal(true);
  });
  it('rejects short username (< 3 chars)', () => {
    expect(validateUsername('ab').valid).to.equal(false);
  });
  it('rejects empty username', () => {
    expect(validateUsername('').valid).to.equal(false);
  });
});
