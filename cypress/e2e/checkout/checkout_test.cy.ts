/// <reference types="cypress" />

describe('Checkout Page Test Suite', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/checkout');
  });

  
  // PAGE LOAD TESTS
  

  it('Should load checkout page', () => {
    cy.contains('Checkout')
      .should('be.visible');
  });

  it('Should display checkout form', () => {
    cy.get('form')
      .should('be.visible');
  });

  
  // SHIPPING INFORMATION TESTS
  

  it('Should display shipping information section', () => {
    cy.contains('Shipping Information')
      .should('be.visible');
  });

  it('Should display full name input', () => {
    cy.get('#fullName')
      .should('be.visible')
      .and('have.attr', 'type', 'text');
  });

  it('Should type into full name field', () => {
    cy.get('#fullName')
      .type('John Doe')
      .should('have.value', 'John Doe');
  });

  it('Should display email input', () => {
    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'type', 'email');
  });

  it('Should type valid email', () => {
    cy.get('#email')
      .type('john@example.com')
      .should('have.value', 'john@example.com');
  });

  it('Should display phone input', () => {
    cy.get('#phone')
      .should('be.visible')
      .and('have.attr', 'type', 'tel');
  });

  it('Should type phone number', () => {
    cy.get('#phone')
      .type('9876543210')
      .should('have.value', '9876543210');
  });

  it('Should display address textarea', () => {
    cy.get('#address')
      .should('be.visible');
  });

  it('Should type address', () => {
    cy.get('#address')
      .type('123 Main Street')
      .should('have.value', '123 Main Street');
  });

  it('Should display city input', () => {
    cy.get('#city')
      .should('be.visible');
  });

  it('Should type city', () => {
    cy.get('#city')
      .type('Chennai')
      .should('have.value', 'Chennai');
  });

  it('Should display ZIP code input', () => {
    cy.get('#zipCode')
      .should('be.visible');
  });

  it('Should type ZIP code', () => {
    cy.get('#zipCode')
      .type('600001')
      .should('have.value', '600001');
  });

  
  // VALIDATION TESTS
  

  it('Should show validation error for empty full name', () => {
    cy.get('#fullName').click().blur();

    cy.contains('Full name is required')
      .should('be.visible');
  });

  it('Should show validation error for invalid email', () => {
    cy.get('#email')
      .type('invalidemail')
      .blur();

    cy.contains('Valid email is required')
      .should('be.visible');
  });

  it('Should show validation error for invalid phone number', () => {
    cy.get('#phone')
      .type('123')
      .blur();

    cy.contains('Valid 10-digit phone number is required')
      .should('be.visible');
  });

  it('Should show validation error for empty address', () => {
    cy.get('#address')
      .click()
      .blur();

    cy.contains('Address is required')
      .should('be.visible');
  });

  it('Should show validation error for empty city', () => {
    cy.get('#city')
      .click()
      .blur();

    cy.contains('City is required')
      .should('be.visible');
  });

  it('Should show validation error for invalid ZIP code', () => {
    cy.get('#zipCode')
      .type('12')
      .blur();

    cy.contains('Valid ZIP code is required')
      .should('be.visible');
  });

  
  // PAYMENT METHOD TESTS
  

  it('Should display payment method section', () => {
    cy.contains('Payment Method')
      .should('be.visible');
  });

  it('Should display Credit Card option', () => {
    cy.contains('Credit Card')
      .should('be.visible');
  });

  it('Should select Credit Card payment', () => {
    cy.get('input[value="Credit Card"]')
      .check({ force: true })
      .should('be.checked');
  });

  it('Should select UPI payment', () => {
    cy.get('input[value="UPI"]')
      .check({ force: true })
      .should('be.checked');
  });

  it('Should select Cash on Delivery payment', () => {
    cy.get('input[value="Cash on Delivery"]')
      .check({ force: true })
      .should('be.checked');
  });

  
  // ORDER SUMMARY TESTS
  

  it('Should display order summary section', () => {
    cy.contains('Order Summary')
      .should('be.visible');
  });

  it('Should display subtotal', () => {
    cy.contains('Subtotal')
      .should('be.visible');
  });

  it('Should display shipping section', () => {
    cy.contains('Shipping')
      .should('be.visible');
  });

  it('Should display FREE shipping text', () => {
    cy.contains('FREE')
      .should('be.visible');
  });

  it('Should display grand total', () => {
    cy.contains('Total')
      .should('be.visible');
  });

  
  // CART ITEM TESTS
  

  it('Should display cart items if available', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.summary-item').length > 0) {

        cy.get('.summary-item')
          .its('length')
          .should('be.greaterThan', 0);

      }

    });
  });

  it('Should display cart item image', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.summary-item img').length > 0) {

        cy.get('.summary-item img')
          .first()
          .should('be.visible');

      }

    });
  });

  it('Should display cart item title', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.title').length > 0) {

        cy.get('.title')
          .first()
          .should('be.visible');

      }

    });
  });

  it('Should display quantity text', () => {
    cy.get('body').then(($body) => {

      if ($body.find('.qty').length > 0) {

        cy.contains('Qty:')
          .should('be.visible');

      }

    });
  });

  
  // PLACE ORDER BUTTON TESTS
  

  it('Should display place order button', () => {
    cy.get('.place-order-btn')
      .should('be.visible')
      .and('contain.text', 'Place Order');
  });

  it('Should disable place order button for invalid form', () => {
    cy.get('.place-order-btn')
      .should('be.disabled');
  });

  it('Should enable place order button for valid form', () => {

    cy.get('#fullName').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#phone').type('9876543210');
    cy.get('#address').type('123 Main Street');
    cy.get('#city').type('Chennai');
    cy.get('#zipCode').type('600001');

    cy.get('input[value="UPI"]')
      .check({ force: true });

    cy.get('.place-order-btn')
      .should('not.be.disabled');
  });

});