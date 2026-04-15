# Node.js Authentication App — Mocha/Chai + Jenkins CI

## Project Overview
A Node.js + Express authentication system supporting user **Signup**, **Login**, and a session-protected **Dashboard**. Views are rendered with EJS. All form inputs are validated by a dedicated validator module.

## Testing Purpose
Automation ensures that authentication (the most security-critical flow) works reliably on every change. Unit tests lock down validation logic; integration tests simulate real user interaction with the UI forms through the Page Object Model (POM); a Jenkins pipeline runs everything on each commit.

## Tech Stack
- Node.js / Express
- EJS (views)
- express-session (auth state)
- Mocha (test runner)
- Chai (assertions)
- Supertest + Cheerio (POM-driven UI/form interaction)
- Mochawesome (HTML test report)
- Jenkins (CI/CD)

## Folder Structure
```
auth-app/
├── src/
│   ├── app.js               # Express app factory
│   ├── server.js            # HTTP listener (localhost:3000)
│   ├── store.js             # In-memory user store
│   ├── routes/auth.js       # Login / Signup / Logout routes
│   ├── utils/validators.js  # Email / Password / Username validators
│   └── views/               # login.ejs, signup.ejs, dashboard.ejs
├── tests/
│   ├── unit/                # validator unit tests
│   ├── integration/         # POM-based UI interaction tests
│   ├── pages/               # Page Object Model classes
│   └── utils/               # test helpers
├── Jenkinsfile
├── package.json
└── README.md
```

## Setup & Run
```bash
npm install
npm start            # http://localhost:3000
```
Pages: `/login`, `/signup`.

## Running Tests
```bash
npm test                 # all tests
npm run test:unit        # unit tests only
npm run test:integration # integration tests only
npm run test:report      # generate reports/test-report.html
```

## Page Object Model
- `tests/pages/BasePage.js` — shared cheerio/supertest helpers.
- `tests/pages/LoginPage.js` — `visit()`, `login(email, password)`, `isLoggedIn()`, `getErrorMessage()`.
- `tests/pages/SignupPage.js` — `visit()`, `signup(username, email, password)`, `isSuccess()`, `getErrorMessage()`.

Each page object encapsulates **locators** (`#email`, `#password`, `#login-btn`, `#error-msg`, …), **actions** (form submission), and **validations** (status, error/success text).

## Test Summary

| Type              | Count | Status |
|-------------------|-------|--------|
| Unit Tests        | 13    | Pass   |
| Integration Tests | 22    | Pass   |
| **Total**         | **35**| **Pass** |

### Coverage
**Unit — Validation Logic**
- Email: valid, missing `@`, missing domain, empty, null
- Password: valid, boundary 6-char, short, empty
- Username: valid, boundary 3-char, short, empty

**Integration — Login POM**
- Valid login → dashboard
- Wrong password → error
- Non-existent user → error
- Empty form → required fields
- Invalid email format → validation error
- Page render assertions

**Integration — Signup POM**
- Valid signup → success
- Missing fields → errors
- Short password / invalid email / short username → errors
- Page render assertions

**Advanced Scenarios (10+)**
1. Random garbage inputs
2. Boundary values accepted
3. Below-boundary rejected
4. Special characters in password
5. Very long username
6. Duplicate signup / rapid submissions
7. Case-insensitive email on login
8. UI locator presence
9. Whitespace-only username
10. Multiple rapid unique signups

## Jenkins Pipeline

Stages defined in `Jenkinsfile`:
1. **Checkout Code** — pulls source from Git.
2. **Install Dependencies** — `npm ci` (falls back to `npm install`).
3. **Run Unit Tests** — `npm run test:unit`.
4. **Run Integration Tests** — `npm run test:integration`.
5. **Generate Reports** — mochawesome HTML published via HTML Publisher plugin.

Post-build actions handle success/failure messaging. Required plugins: **NodeJS**, **HTML Publisher**, **Git**. Configure Node.js v18.x under *Manage Jenkins → Tools* as `NodeJS-18`.

## Screenshots
Place in `docs/screenshots/`:
- `local-tests.png` — all tests passing locally
- `jenkins-build.png` — successful Jenkins build
- `jenkins-report.png` — published HTML report

## Author
- **Name:** Saad Zafar
- **Submission Date:** 2026-04-15
