/// <reference types="cypress" />

describe('profile tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#signin-email').type('john@example.com');
        cy.get('#signin-password').type('Password123!')
        cy.get('#signin-submit').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/profile');
    })

    it('Edit only editbutton is clicked', () => {
        cy.get('#toggle-edit-mode-btn').click();
        cy.wait(2000)
        cy.get('#profile-fullname-input').should('not.have.attr', 'readonly')
    })
})