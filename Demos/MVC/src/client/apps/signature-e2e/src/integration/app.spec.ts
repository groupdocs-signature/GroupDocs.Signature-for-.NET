import { getGreeting } from '../support/app.po';

describe('signature', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to signature!');
  });
});
