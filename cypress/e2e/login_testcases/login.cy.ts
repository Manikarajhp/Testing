/// <reference types="cypress" />

describe('Login page testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  })

  it('Valid email and password and login to the application', () => {
    cy.get("#signin-email").type("john@example.com");
    cy.get("#signin-password").type("Password123!");
    cy.get("#signin-submit").click();

    cy.contains("Welcome back,").should("be.visible");

    cy.url().should("include", "/home");
  })

  it.only('Valid email and password and login to the application with enter', () => {
    cy.get("#signin-email").type("john@example.com");
    cy.get("#signin-password").type("Password123!{enter}");

    cy.contains("Welcome back,").should("be.visible");

    cy.url().should("include", "/home");
  })

  it('InValid email and password and login to the application', () => {
    cy.get("#signin-email").type("john123@example.com");
    cy.get("#signin-password").type("Pas234sword123!");
    cy.get("#signin-submit").click();
    cy.contains("User not found").should("be.visible");
  })

  it("valid email and invalid password", () => {
    cy.get('#signin-email').type('john@example.com');
    cy.get('#signin-password').type('john123');
    cy.get('#signin-submit').click();

    cy.contains("Incorrect password").should('be.visible');
  })

  //For Email input testcases
  it('Check the input type defined in email', () => {
    cy.get("#signin-email").should('have.attr', 'type', 'email');
  })

  it('Email without @ symbol', () => {
    cy.get('#signin-email').type('john.example.com');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Email without domain name', () => {
    cy.get('#signin-email').type('johnexample@');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Email without username', () => {
    cy.get('#signin-email').type('@example.com');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Email without .com', () => {
    cy.get('#signin-email').type('john@example');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Email with multiple @ symbol', () => {
    cy.get('#signin-email').type('john@@example.com');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Invalid email shows warning message [textmessage]', () => {
    cy.get("#signin-email").type("johnexample.com");
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Invalid email shows warning message [Number]', () => {
    cy.get("#signin-email").type("1234567");
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Invalid email shows warning message [@]', () => {
    cy.get('#signin-email').type('@');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Invalid email only with [spaces]', () => {
    cy.get('#signin-email').type(' ');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Invalid email with [Special Characters]', () => {
    cy.get('#signin-email').type('@#%^');
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  it("Email just focused with no value error.", () => {
    cy.get('#signin-email').focus();
    cy.get('#signin-email').blur();
    cy.contains("Please enter a valid email address.").should("be.visible");
    cy.get('#signin-submit').should('be.disabled');
  })

  // For password testcases
  it('Check the password field type defined in password', () => {
    cy.get("#signin-password").should('have.attr', 'type', 'password');
  })

  it('Password shows error when empty', () => {
    cy.get('#signin-password').focus();
    cy.get('#signin-password').blur();
    cy.contains("Password is required.").should("be.visible");
  })

  it('Password shows error when just focus', () => {
    cy.get('#signin-password').focus();
    cy.get('#signin-password').blur();
    cy.contains("Password is required.").should("be.visible");
  })

  it('Password show toggle button password field to text fiels', () => {
    cy.get('#signin-password').type('Password123!');
    cy.get('#signin-toggle-password-show').click();
    cy.get('#signin-password').should('have.attr', 'type', 'text');
  })

  it('Password show toggle button password field to text fiels', () => {
    cy.get('#signin-password').type('Password123!');
    cy.get('#signin-toggle-password-show').click();
    cy.get('#signin-toggle-password-hide').click();
    cy.get('#signin-password').should('have.attr', 'type', 'password');
  })

  // For button and link
  it('Sign in button is disabled when form is empty', () => {
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Sign in button is disabled when email alone entered', () => {
    cy.get('#signin-email').type('john@example.com');
    cy.get('#signin-submit').should('be.disabled');
  })

  it('Sign in button is disabled when password alone entered', () => {
    cy.get('#signin-password').type('Password123!');
    cy.get('#signin-submit').should('be.disabled');
  })

  //auth-toggle-link
  it('signup display when signin click', () => {
    cy.get('#auth-toggle-link').click();
    cy.contains('Sign Up').should('be.visible');
  })
  
  it('signin display when signup click', () => {
    cy.get('#auth-toggle-link').click();
    cy.get('#auth-toggle-link').click();
    cy.contains('Sign In').should('be.visible');
  })
})