/// <reference types="cypress" />

describe('Categories Page Testing', () => {

  beforeEach(() => {
   cy.visit('http://localhost:4200/categories');
  });
  // Page Load Test
  it('should load categories page successfully', () => {

    cy.contains('Shop By Categories')
      .should('be.visible');

    cy.get('#search-input')
      .should('be.visible');

  });

  // Search Functionality
  it('should search categories correctly', () => {

    cy.get('#search-input')
      .type('Electronics');

    cy.get('[data-cy="category-card"]')
      .should('have.length.greaterThan', 0);

  });

  // Search No Results
  it('should show no results message', () => {

    cy.get('#search-input')
      .type('xyz123');

    cy.get('#no-results')
      .should('be.visible');

    cy.contains('No results match your search')
      .should('be.visible');

  });

  // Clear Search Button
  it('should clear search input', () => {

    cy.get('#search-input')
      .type('xyz123');

    cy.get('#clear-search')
      .click();

    cy.get('#search-input')
      .should('have.value', '');

  });

  // Results Count
  it('should update results count', () => {

    cy.get('#results-count')
      .invoke('text')
      .then((beforeCount) => {

        cy.get('#search-input')
          .type('Electronics');

        cy.get('#results-count')
          .invoke('text')
          .should((afterCount) => {

            expect(afterCount).to.not.equal(beforeCount);

          });

      });

  });

  // Sort Menu Open
  it('should open sort menu', () => {

    cy.get('#sort-button')
      .click();

    cy.get('#sort-name')
      .should('be.visible');

    cy.get('#sort-count')
      .should('be.visible');

  });

  // Sort By Name
  it('should sort by name', () => {

    cy.get('#sort-button')
      .click();

    cy.get('#sort-name')
      .click();

  });

  // Sort By Product Count
  it('should sort by product count', () => {

    cy.get('#sort-button')
      .click();

    cy.get('#sort-count')
      .click();

  });

  // Category Cards Display
  it('should display category cards', () => {

    cy.get('[data-cy="category-card"]')
      .should('exist');

    cy.get('[data-cy="category-card"]')
      .its('length')
      .should('be.greaterThan', 0);

  });

  // Product Search Test
  it('should display matching products while searching', () => {

    cy.get('#search-input')
      .type('jewelery');

    cy.get('[data-cy="product-card"]')
      .should('exist');

  });

  // Category Navigation Test

  it('should navigate to category products page', () => {

    cy.get('[data-cy="category-card"]')
      .first()
      .click();

    cy.url().should('include', '/category/');

  });

  // Product Detail Navigation Test
  it('should open product detail page', () => {

    cy.get('#search-input')
      .type('jewelery');

    cy.get('[data-cy="product-card"]')
      .first()
      .click();

    cy.url().should('include', '/products');

  });

  // View Details Button Test
  it('should open product detail page using view details button', () => {

    cy.get('#search-input')
      .type('jewelery');

    cy.get('#view-details')
      .first()
      .click();

    cy.url().should('include', '/products');

  });

  // Responsive Test
  it('should work on mobile screen', () => {

    cy.viewport('iphone-x');

    cy.get('#search-input')
      .should('be.visible');

    cy.get('[data-cy="category-card"]')
      .should('exist');

  });

});