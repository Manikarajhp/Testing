/// <reference types="cypress" />

describe('Orders Page Test Suite', () => {

  beforeEach(() => {
    // Visit orders page
    cy.visit('http://localhost:4200/orders');
  });

  
  // HERO SECTION TESTS
  

  it('Should display hero section', () => {
    cy.contains('My').should('be.visible');
    cy.contains('Orders').should('be.visible');

    cy.contains(
      'Track and manage your recent orders'
    ).should('be.visible');
  });

  it('Should display hero background image', () => {
    cy.get('section img')
      .should('be.visible')
      .and('have.attr', 'src');
  });

  
  // ORDERS LIST TESTS
  

  it('Should display orders list if orders exist', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.orders-list').length > 0) {
        cy.get('.orders-list').should('be.visible');
      }

    });
  });

  it('Should display at least one order card', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-card').length > 0) {
        cy.get('.order-card')
          .its('length')
          .should('be.greaterThan', 0);
      }

    });
  });

  
  // ORDER HEADER TESTS
  

  it('Should display order number', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-card').length > 0) {
        cy.contains('Order Number')
          .should('be.visible');
      }

    });
  });

  it('Should display date placed', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-card').length > 0) {
        cy.contains('Date Placed')
          .should('be.visible');
      }

    });
  });

  it('Should display total amount', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-card').length > 0) {
        cy.contains('Total Amount')
          .should('be.visible');
      }

    });
  });

  it('Should display order status', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-status').length > 0) {
        cy.get('.order-status')
          .first()
          .should('be.visible');
      }

    });
  });

  
  // ORDER ITEMS TESTS
  

  it('Should display order items', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-item').length > 0) {
        cy.get('.order-item')
          .its('length')
          .should('be.greaterThan', 0);
      }

    });
  });

  it('Should display product image', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.order-item img').length > 0) {
        cy.get('.order-item img')
          .first()
          .should('be.visible');
      }

    });
  });

  it('Should display product title', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.item-info h4').length > 0) {
        cy.get('.item-info h4')
          .first()
          .should('be.visible');
      }

    });
  });

  it('Should display quantity of ordered product', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.item-meta').length > 0) {
        cy.contains('Qty:')
          .should('be.visible');
      }

    });
  });

  it('Should display item total price', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.item-total').length > 0) {
        cy.get('.item-total')
          .first()
          .should('be.visible');
      }

    });
  });

  
  // ORDER FOOTER TESTS
  

  it('Should display delivery location', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.customer-preview').length > 0) {
        cy.contains('Delivering to')
          .should('be.visible');
      }

    });
  });

  it('Should display view details button', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.view-details-btn').length > 0) {
        cy.get('.view-details-btn')
          .first()
          .should('be.visible')
          .and('contain.text', 'View Details');
      }

    });
  });

  
  // EMPTY STATE TESTS
  

  it('Should display empty state when no orders exist', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.empty-state').length > 0) {

        cy.contains('No orders yet')
          .should('be.visible');

        cy.contains("You haven't placed any orders yet"
        ).should('be.visible');

      }

    });
  });

  it('Should display start shopping button in empty state', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.shop-now-btn').length > 0) {

        cy.get('.shop-now-btn')
          .should('be.visible')
          .and('contain.text', 'Start Shopping');

      }

    });
  });

  it('Should navigate to home page when Start Shopping clicked', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.shop-now-btn').length > 0) {

        cy.get('.shop-now-btn').click();

        cy.url().should('include', '/home');

      }

    });
  });

});