/// <reference types="cypress" />

describe('Search functionality tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#signin-email').type('john@example.com');
        cy.get('#signin-password').type('Password123!');
        cy.get('#signin-submit').click();
    })

    it('Search a product', () => {
        cy.get('#product-search-input').type('keyboard');
        cy.wait(2000)
        cy.get('.product-card').each(($card) => {
            cy.wrap($card).should('contain', 'keyboard');
        })
        cy.get('#product-search-input').clear();
    })
})