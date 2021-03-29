describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Name',
      username: 'Cypress Username',
      password: 'Cypress Password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17 - Front page can be opened', function () {
    cy.contains('List of blogs')
  })

  it('5.17 - Login form can be opened', function () {
    cy.contains('Login').click()
  })

  it('5.18 - User can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('Cypress Username')
    cy.get('#password').type('Cypress Password')
    cy.get('#login-button').click()

    cy.contains('Cypress Name logged in')
  })

  it('5.18 - Login fails with wrong password', function () {
    cy.contains('Login').click()
    cy.get('#username').type('Cypress Username')
    cy.get('#password').type('Wrong Password')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Cypress Name logged in')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Cypress Username', password: 'Cypress Password' })
    })

    it('5.19 - A new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Cypress Test Title')
      cy.get('#author').type('Cypress Test Author')
      cy.get('#url').type('http://cypress.test')
      cy.get('#blog-button').click()

      cy.contains('Cypress Test Title')
      cy.contains('Cypress Test Author')
    })

    describe('A blog has been created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress Test Title',
          author: 'Cypress Test Author',
          url: 'http://cypress.test'
        })
        cy.createBlog({
          title: 'Other Test Title',
          author: 'Other Test Author',
          url: 'http://other.test'
        })
      })

      it('5.20 - Blog details can be viewed', function () {
        cy.contains('Cypress Test Title').get('#view-button').click()

        cy.contains('Cypress Test Title')
          .get('.visibleBlogContent')
          .should('not.be.visible')
        cy.contains('Cypress Test Title')
          .get('.hiddenBlogContent')
          .should('be.visible')
          .contains('Cypress Test Title')
          .contains('http://cypress.test')
      })

      it('5.20 - Blog can be liked', function () {
        cy.contains('Cypress Test Title').get('#view-button').click()

        cy.contains('Cypress Test Title').get('.hiddenBlogContent').contains('likes 0')
        cy.contains('Cypress Test Title')
          .get('.hiddenBlogContent')
          .get('#like-button')
          .click()
        cy.contains('Cypress Test Title').get('.hiddenBlogContent').contains('likes 1')
      })

      it('5.21 - Blog can be deleted', function () {
        cy.contains('Cypress Test Title').get('#view-button').click()

        cy.contains('Cypress Test Title')
          .get('.hiddenBlogContent')
          .get('#remove-button')
          .click()
        cy.get('html').should('not.contain', 'Cypress Test Title')
      })

      it.only('5.22 - Blogs are ordered by amount of likes', function () {
        cy.contains('Cypress Test Title').contains('View').click()
        cy.contains('Other Test Title').contains('View').click()
        cy.contains('Cypress Test Title')
          .parent()
          .find('.hiddenBlogContent')
          .contains('Like')
          .click()

        cy.wait(1000)
        cy.get('html').find('.blog').first().contains('Cypress Test Title')
      })
    })
  })
})
