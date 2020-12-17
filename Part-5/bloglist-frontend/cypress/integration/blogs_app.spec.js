describe('Blog app', function () {
  //reset the DB before each test in this block ~~ but not when CHECKING DELETE AFTER LOGIN
  //if you run reset request each time before creating a new blof
  //the blos returned from server won't contain a defined user prop.But  user: null  instead
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

describe('after log in', function () {
  beforeEach(function () {
    cy.login({ userName: 'Xenia E2E', password: 'secret' });

    it('three blogs can be created', function () {
      cy.addNewBlog({
        title: 'E2E testing blog 3',
        author: 'Xenia',
        url: '//some-testing-url',
        likes: 1,
      });

      cy.addNewBlog({
        title: 'E2E testing blog 4',
        author: 'Xenia',
        url: '//some-testing-url',
        likes: 45,
      });
      cy.addNewBlog({
        title: 'E2E testing blog 5',
        author: 'Xenia',
        url: '//some-testing-url',
        likes: 5,
      });
    });
  });

  it.only('can like a blog', function () {
    cy.contains('view').click();

    cy.get('#likeBtn').click();
  });

  it('can delete blog', function () {
    cy.contains('view').click();
    cy.get('#deleteBlog').click();

    //no need to mock HTTP Delete request in test.
    //Just test the button click
    //request will be sent by eventa handler which is set on this button
    // cy.deleteBlog('5fda3f0906fbb91218802a8e');
  });

  it.only('blogs order by likse', function () {
    cy.getAll().then((blogs) => {
      //blogs you get here is an array you get from server. It's not sorted yet!!!
      //so you sghould sort it and then check the blogs order correspond to sorting
      blogs.sort((a, b) => b.likes - a.likes);
      const likesRace = () => blogs[0].likes > blogs[1].likes;

      cy.wrap({ race: likesRace }).invoke('race').should('eq', true);
    });
  });
});

// const getName = () => {
//   return 'Jane Lane'
// }

// cy.wrap({ name: getName }).invoke('name').should('eq', 'Jane Lane') // true
