describe('Complete Cart Flow Testing', () => {

  // =====================================================
  // STEP 1 : OPEN CART PAGE AND VERIFY EMPTY CART
  // =====================================================

  it('should open cart page and show empty cart', () => {

    cy.visit('http://localhost:4200/cart');

    // Verify cart page header
    cy.get('#cart-page-header')
      .should('be.visible')
      .and('contain', 'Your Shopping Cart');

    // Verify empty cart container
    cy.get('#empty-cart-container')
      .should('be.visible');

    // Verify empty cart text
    cy.get('#empty-cart-header')
      .should('contain', 'Your cart is empty');

    // Verify shop now button
    cy.get('#empty-cart-shop-now-btn')
      .should('be.visible')
      .and('contain', 'Shop Now');

  });

  // =====================================================
  // STEP 2 : CLICK SHOP NOW BUTTON
  // =====================================================

  it('should navigate to home page when clicking Shop Now', () => {

    cy.visit('http://localhost:4200/cart');

    cy.get('#empty-cart-shop-now-btn')
      .click();

    // Verify navigation
    cy.url().should('include', '/home');

    // Verify home page products visible
    cy.get('#product-grid')
      .should('be.visible');

  });

  // =====================================================
  // STEP 3 : OPEN PRODUCT DETAILS PAGE
  // =====================================================

  it('should open product details page when clicking product card', () => {

    cy.visit('http://localhost:4200/home');

    // Click first product card
    cy.get('[id^="product-card-"]')
      .first()
      .click();

    // Verify URL changed
    cy.url().should('include', '/products/');

  });

  // =====================================================
  // STEP 4 : ADD PRODUCT TO CART
  // =====================================================

  it('should add product to cart successfully', () => {

    cy.visit('http://localhost:4200/home');

    // Add first product
    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    // Open cart page
    cy.visit('http://localhost:4200/cart');

    // Verify cart content section
    cy.get('#cart-content-section')
      .should('be.visible');

    // Verify cart item added
    cy.get('#cart-items-list')
      .children()
      .should('have.length', 1);

  });

  // =====================================================
  // STEP 5 : VERIFY CART PRODUCT DETAILS
  // =====================================================

  it('should display added product details in cart page', () => {

    cy.visit('http://localhost:4200/home');

    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    cy.visit('http://localhost:4200/cart');

    // Product title
    cy.get('[id^="item-title-"]')
      .should('be.visible');

    // Product description
    cy.get('[id^="item-description-"]')
      .should('be.visible');

    // Product price
    cy.get('[id^="unit-price-"]')
      .should('be.visible');

    // Quantity
    cy.get('[id^="quantity-value-"]')
      .should('contain', '1');

  });

  // =====================================================
  // STEP 6 : INCREASE PRODUCT QUANTITY
  // =====================================================

  it('should increase product quantity', () => {

    cy.visit('http://localhost:4200/home');

    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    cy.visit('http://localhost:4200/cart');

    // Increase quantity
    cy.get('[id^="increase-btn-"]')
      .click();

    // Verify quantity updated
    cy.get('[id^="quantity-value-"]')
      .should('contain', '2');

  });

  // =====================================================
  // STEP 7 : DECREASE PRODUCT QUANTITY
  // =====================================================

  it('should decrease product quantity', () => {

    cy.visit('http://localhost:4200/home');

    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    cy.visit('http://localhost:4200/cart');

    // Increase first
    cy.get('[id^="increase-btn-"]')
      .click();

    // Decrease quantity
    cy.get('[id^="decrease-btn-"]')
      .click();

    // Verify quantity
    cy.get('[id^="quantity-value-"]')
      .should('contain', '1');

  });

  // =====================================================
  // STEP 8 : REMOVE PRODUCT
  // =====================================================

  it('should remove product from cart', () => {

    cy.visit('http://localhost:4200/home');

    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    cy.visit('http://localhost:4200/cart');

    // Remove item
    cy.get('[id^="remove-btn-"]')
      .click();

    // Verify empty cart shown
    cy.get('#empty-cart-container')
      .should('be.visible');

  });

  // =====================================================
  // STEP 9 : REMOVE ALL PRODUCTS
  // =====================================================

  it('should show empty cart after removing all products', () => {

    cy.visit('http://localhost:4200/home');

    // Add two products
    cy.get('[id^="add-to-cart-btn-"]')
      .eq(0)
      .click();

    cy.get('[id^="add-to-cart-btn-"]')
      .eq(1)
      .click();

    cy.visit('http://localhost:4200/cart');

    // Remove all products
    cy.get('[id^="remove-btn-"]')
      .each(($btn) => {

        cy.wrap($btn).click();

      });

    // Verify empty cart
    cy.get('#empty-cart-container')
      .should('be.visible');

    // Verify shop now button visible
    cy.get('#empty-cart-shop-now-btn')
      .should('be.visible');

  });

  // =====================================================
  // STEP 10 : PROCEED TO CHECKOUT
  // =====================================================

  it('should navigate to checkout page', () => {

    cy.visit('http://localhost:4200/home');

    // Add product
    cy.get('[id^="add-to-cart-btn-"]')
      .first()
      .click();

    cy.visit('http://localhost:4200/cart');

    // Click checkout button
    cy.get('#proceed-to-checkout-btn')
      .click();

    // Verify checkout page
    cy.url().should('include', '/checkout');

  });

});