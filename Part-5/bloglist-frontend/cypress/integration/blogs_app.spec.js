describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3004/api/test/reset');

    const testUser = {
      username: 'Xenia E2E',
      name: 'Xenia',
      password: 'secret',
    };

    cy.request('POST', 'http://localhost:3004/api/users', testUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log-in into application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ userName: 'Xenia E2E', password: 'secret' });
      cy.contains('Xenia E2E is logged-in');
    });

    it.only('fails with wrong credentials', function () {
      cy.get('#userName').type('Xenia E2E');
      cy.get('#password').type('wrong secret');
      cy.contains('Log in').click();

      const myErr = cy.get('.Err');
      expect(myErr).to.exist;

      cy.get('.Err')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
