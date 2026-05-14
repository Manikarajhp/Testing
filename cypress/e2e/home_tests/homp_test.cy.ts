/// <reference types="cypress" />

describe('Home page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#signin-email').type('john@example.com');
        cy.get('#signin-password').type('Password123!');
        cy.get('#signin-submit').click();
    })

    //Navbar
    it('Display the Brnad name', () => {
        cy.get('#navbar-logo').should('be.visible');
    })

    it('Navigate to dashboard when click logo', () => {
        cy.get('#navbar-logo').click();
        cy.url().should('include', '/home');
    })

    it('Navbar has navigation links', () => {
        cy.get('#desktop-nav').should('be.visible');
        cy.get('#desktop-nav').contains('Home').should('be.visible');
        cy.get('#desktop-nav').contains('Category').should('be.visible');
        cy.get('#desktop-nav').contains('My Orders').should('be.visible');
    })

    it('Navgation links naviage to proper pages', () => {
        cy.get('#nav-home-link').click();
        cy.url().should('include', '/home');
        cy.get('#nav-category-link').click();
        cy.url().should('include', '/category');
        cy.get('#nav-orders-link').click();
        cy.url().should('include', '/orders');
        cy.get('#nav-cart-btn').click();
        cy.url().should('include', '/cart');
        cy.get('#nav-profile-btn').click();
        cy.url().should('include', '/profile');
    })

    it('Logout check', () => {
        cy.get('#nav-logout-btn').click();
        cy.window().then((win) => {
            expect(win.localStorage.getItem('currentUser')).to.be.null
        })
    })

    //Products test
    it('Product card test', () => {
        cy.get('#product-card-1').click();
        cy.url().should('include', '/products/1');
    })

    it('Add to cart button', () => {
        cy.get('#add-to-cart-btn-1').click();
        cy.get('#nav-cart-count')
            .invoke('text')
            .then(Number)
            .should('be.gt', 0)
    })

    it('Test the last product', () => {
        cy.wait(5000);
        cy.get('.product-card').first().click();
        cy.url().should('include', '/products');
    })

    it('Test the indexed product', () => {
        cy.wait(5000);
        cy.get('.product-card').eq(2).click();
        cy.url().should('include', '/products');
    })

    it('Test the last product', () => {
        cy.wait(5000);
        cy.get('#product-grid').children().first().click();
        cy.url().should('include', '/products');
    })

    


})