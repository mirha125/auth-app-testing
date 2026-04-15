const request = require('supertest');
const cheerio = require('cheerio');

class BasePage {
  constructor(app) {
    this.app = app;
    this.lastResponse = null;
    this.$ = null;
  }

  _load(res) {
    this.lastResponse = res;
    this.$ = cheerio.load(res.text || '');
    return this;
  }

  getStatus() { return this.lastResponse ? this.lastResponse.status : 0; }
  getText(selector) { return this.$ ? this.$(selector).text().trim() : ''; }
  exists(selector) { return this.$ ? this.$(selector).length > 0 : false; }
  getErrorMessage() { return this.getText('#error-msg'); }
  getSuccessMessage() { return this.getText('#success-msg'); }
  getTitle() { return this.getText('#page-title'); }
}

module.exports = BasePage;
