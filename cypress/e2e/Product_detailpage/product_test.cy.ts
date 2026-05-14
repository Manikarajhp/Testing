/// <reference types="cypress" />

describe('Product detail page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/products/1');
    })

    it('Add to cart button', () => {
        cy.get('#add-to-cart-details-btn').click();
        cy.get('#nav-cart-count')
            .invoke('text')
            .then(Number)
            .should('be.gt', 0)
    })
  
    it('Test Quantity increase', () => {
        cy.get('#product-quantity-display')
            .invoke('text')
            .then(Number)
            .then((initialQty) => {
            
            cy.get('#increase-quantity-btn')
                .click()
        
          cy.get('#product-quantity-display')
            .invoke('text')
            .then(Number)
            .should('eq', initialQty + 1)
        
        })
    })

    it('Test Quantity decrease', () => {
        cy.get('#increase-quantity-btn')
        .click()

        cy.get('#product-quantity-display')
        .invoke('text')
        .then(Number)
        .then((initialQty) => {
            
            cy.get('#decrease-quantity-btn')
                .click()
        
          cy.get('#product-quantity-display')
            .invoke('text')
            .then(Number)
            .should('eq', initialQty - 1)
        
        })
    })

    it('Test Quantity decrease when quantity is 1', () => {
        cy.get('#decrease-quantity-btn')
        .should('be.disabled')
    })

    it('Quantity count grater than stock', () => {
        cy.get('#product-stock-value')
        .invoke('text')
        .then(Number)
        .then((stock) => {
          for (let i = 0; i < stock-1; i++) {
            
            cy.get('#increase-quantity-btn')
              .click()
          }
          cy.get('#increase-quantity-btn').should('be.disabled');
        })
    })
})