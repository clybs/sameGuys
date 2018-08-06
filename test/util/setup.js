/**
 * Setup test environment
 */

const Chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

// Attach expect / sinon to global space
global.chai = Chai;
global.expect = Chai.expect;
global.sinon = Sinon;

// Use sinonChai
Chai.use(sinonChai);
Chai.use(chaiHttp);
