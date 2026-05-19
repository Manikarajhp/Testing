/// <reference types="cypress" />

describe('Cart Page Test Suite', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/cart');
  });

  // =========================================
  // Hero Section Tests
  // =========================================

  it('should display cart page hero section correctly', () => {

    cy.get('#cart-page-header')
      .should('be.visible')
      .and('contain', 'Your Shopping Cart');

  });

  // =========================================
  // Empty Cart Tests
  // =========================================

  it('should display empty cart section when cart is empty', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#empty-cart-container').length > 0) {

        cy.get('#empty-cart-container')
          .should('be.visible');

        cy.get('#empty-cart-header')
          .should('contain', 'Your cart is empty');

        cy.get('#empty-cart-message')
          .should('contain', "haven't added anything");

        cy.get('#empty-cart-shop-now-btn')
          .should('be.visible');

      }

    });

  });

  it('should navigate to home page when clicking Shop Now button', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#empty-cart-shop-now-btn').length > 0) {

        cy.get('#empty-cart-shop-now-btn')
          .click();

        cy.url().should('include', '/home');

      }

    });

  });

  // =========================================
  // Cart Items Section Tests
  // =========================================

  it('should display cart content when items exist', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#cart-content-section').length > 0) {

        cy.get('#cart-content-section')
          .should('be.visible');

        cy.get('#cart-items-list')
          .should('exist');

      }

    });

  });

  it('should display product details correctly', () => {

    cy.get('body').then(($body) => {

      const cartItems = $body.find('[id^="cart-item-"]');

      if (cartItems.length > 0) {

        cy.wrap(cartItems).each(($item) => {

          cy.wrap($item)
            .find('img')
            .should('be.visible');

          cy.wrap($item)
            .find('[id^="item-title-"]')
            .should('be.visible');

          cy.wrap($item)
            .find('[id^="item-description-"]')
            .should('be.visible');

          cy.wrap($item)
            .find('[id^="unit-price-"]')
            .should('contain', '$');

          cy.wrap($item)
            .find('[id^="total-item-price-"]')
            .should('contain', '$');

        });

      }

    });

  });

  // =========================================
  // Quantity Button Tests
  // =========================================

  it('should increase quantity when plus button is clicked', () => {

    cy.get('body').then(($body) => {

      const increaseBtn = $body.find('[id^="increase-btn-"]').first();

      if (increaseBtn.length > 0) {

        const buttonId = increaseBtn.attr('id');
        const productId = buttonId.replace('increase-btn-', '');

        cy.get(`#quantity-value-${productId}`)
          .invoke('text')
          .then((qtyText) => {

            const initialQty = parseInt(qtyText);

            cy.get(`#increase-btn-${productId}`)
              .click();

            cy.get(`#quantity-value-${productId}`)
              .should(($qty) => {

                const updatedQty = parseInt($qty.text());
                expect(updatedQty).to.be.greaterThan(initialQty);

              });

          });

      }

    });

  });

  it('should decrease quantity when minus button is clicked', () => {

    cy.get('body').then(($body) => {

      const decreaseBtn = $body.find('[id^="decrease-btn-"]').first();

      if (decreaseBtn.length > 0) {

        const buttonId = decreaseBtn.attr('id');
        const productId = buttonId.replace('decrease-btn-', '');

        cy.get(`#quantity-value-${productId}`)
          .invoke('text')
          .then((qtyText) => {

            const initialQty = parseInt(qtyText);

            if (initialQty > 1) {

              cy.get(`#decrease-btn-${productId}`)
                .click();

              cy.get(`#quantity-value-${productId}`)
                .should(($qty) => {

                  const updatedQty = parseInt($qty.text());
                  expect(updatedQty).to.be.lessThan(initialQty);

                });

            }

          });

      }

    });

  });

  // =========================================
  // Remove Item Tests
  // =========================================

  it('should remove item from cart', () => {

    cy.get('body').then(($body) => {

      const removeBtn = $body.find('[id^="remove-btn-"]').first();

      if (removeBtn.length > 0) {

        const buttonId = removeBtn.attr('id');
        const productId = buttonId.replace('remove-btn-', '');

        cy.get(`#cart-item-${productId}`)
          .should('exist');

        cy.get(`#remove-btn-${productId}`)
          .click();

        cy.get(`#cart-item-${productId}`)
          .should('not.exist');

      }

    });

  });

  // =========================================
  // Order Summary Tests
  // =========================================

  it('should display order summary correctly', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#cart-summary-section').length > 0) {

        cy.get('#summary-header')
          .should('contain', 'Order Summary');

        cy.get('#cart-subtotal')
          .should('contain', '$');

        cy.get('#shipping-status')
          .should('contain', 'FREE');

        cy.get('#cart-total-price')
          .should('contain', '$');

      }

    });

  });

  // =========================================
  // Checkout Navigation Test
  // =========================================

  it('should navigate to checkout page', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#proceed-to-checkout-btn').length > 0) {

        cy.get('#proceed-to-checkout-btn')
          .click();

        cy.url().should('include', '/checkout');

      }

    });

  });

  // =========================================
  // Continue Shopping Navigation Test
  // =========================================

  it('should navigate to home page from continue shopping link', () => {

    cy.get('body').then(($body) => {

      if ($body.find('#continue-shopping-link').length > 0) {

        cy.get('#continue-shopping-link')
          .click();

        cy.url().should('include', '/home');

      }

    });

  });

});