describe('Blog app', function () {
  //reset the DB before each test in this block ~~ but not when CHECKING DELETE AFTER LOGIN
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3004/api/test/reset');

    const testUser = {
      username: 'Xenia E2E',
      name: 'Xenia',
      password: 'secret',
      // id: 1,
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

    it('fails with wrong credentials', function () {
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

describe.only('after log in', function () {
  beforeEach(function () {
    cy.login({ userName: 'Xenia E2E', password: 'secret' });
  });

  it('A blog can be created', function () {
    cy.addNewBlog({
      title: 'E2E testing blog',
      author: 'Xenia',
      url: '//some-testing-url',
      likes: 10,
    });
  });

  it('can like a blog', function () {
    cy.contains('view').click();

    const likeBtn = cy.get('#likes');
    expect(likeBtn).not.to.be.empty;

    cy.get('#likes').should('contain', 'likes: 10');
    cy.contains('like').click();
  });

  it.only('can delete blog', function () {
    cy.contains('view').click();
    cy.get('#deleteBlog').click();

    //no need to mock HTTP Delete request in test.
    //Just test the button click
    //request will be sent by eventa handler which is set on this button
    // cy.deleteBlog('5fda3f0906fbb91218802a8e');
  });
});
