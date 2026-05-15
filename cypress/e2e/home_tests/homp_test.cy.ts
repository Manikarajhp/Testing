/// <reference types="cypress" />

describe('Home Page Complete Test Suite', () => {

  beforeEach(() => {
    // Login before every test
    cy.visit('http://localhost:4200/login');

    cy.get('#signin-email').type('john@example.com');
    cy.get('#signin-password').type('Password123!');
    cy.get('#signin-submit').click();

    cy.url().should('include', '/home');
  });


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
  
  // HERO SECTION TESTS
  

  it('Should display hero section contents', () => {
    cy.contains('Upgrade Your').should('be.visible');
    cy.contains('Lifestyle').should('be.visible');
    cy.contains('SHOP').should('be.visible');

    cy.contains(
      'Discover our curated collection of premium gadgets'
    ).should('be.visible');
  });

  
  // SEARCH FUNCTIONALITY TESTS
  

  it('Should display search input', () => {
    cy.get('#product-search-input')
      .should('be.visible')
      .and('have.attr', 'placeholder');
  });

  it('Should search a product', () => {
    cy.get('#product-search-input').type('keyboard');

    cy.wait(2000);

    cy.get('.product-card').each(($card) => {
      cy.wrap($card).should('contain.text', 'keyboard');
    });

    cy.get('#product-search-input').clear();
  });

  it('Should show no products found for invalid search', () => {
    cy.get('#product-search-input').type('abcdefghxyz');

    cy.wait(2000);

    cy.get('#no-products-found')
      .should('be.visible')
      .and('contain.text', 'No products found');
  });

  
  // FEATURED PRODUCTS SECTION
  

  it('Should display featured products section', () => {
    cy.contains('Featured Products').should('be.visible');

    cy.contains(
      'Handpicked quality items just for you'
    ).should('be.visible');
  });

  it('Should display product grid', () => {
    cy.get('#product-grid').should('be.visible');
  });

  it('Should display at least one product card', () => {
    cy.get('.product-card')
      .should('exist')
      .its('length')
      .should('be.greaterThan', 0);
  });

  it('Should navigate to product details page when product clicked', () => {
    cy.get('.product-card').first().click();

    cy.url().should('include', '/products');
  });

  it('Should test indexed product navigation', () => {
    cy.get('.product-card').eq(2).click();

    cy.url().should('include', '/products');
  });

  it('Should display product image', () => {
    cy.get('.product-card img')
      .first()
      .should('be.visible');
  });

  it('Should display product title', () => {
    cy.get('.product-title')
      .first()
      .should('be.visible');
  });

  it('Should display product price', () => {
    cy.get('.product-price')
      .first()
      .should('be.visible');
  });

  it('Should display product rating', () => {
    cy.get('.star-icon')
      .first()
      .should('be.visible');
  });

  it('Should display category badge', () => {
    cy.get('.category-badge')
      .first()
      .should('be.visible');
  });

  
  // ADD TO CART TESTS
  

  it('Should add product to cart', () => {
    cy.get('.add-cart-btn').first().click();

    cy.get('#nav-cart-count')
      .invoke('text')
      .then(Number)
      .should('be.greaterThan', 0);
  });

  it('Should display add to cart button', () => {
    cy.get('.add-cart-btn')
      .first()
      .should('be.visible');
  });

  
  // VIEW ALL PRODUCTS BUTTON
  

  it('Should display View All button', () => {
    cy.get('#view-all-products-btn')
      .should('be.visible')
      .and('contain.text', 'View All');
  });

  
  // NEWSLETTER SECTION TESTS
  

  it('Should display newsletter section', () => {
    cy.contains('Join our Newsletter')
      .should('be.visible');

    cy.contains(
      'Get the latest updates on new products'
    ).should('be.visible');
  });

  it('Should display newsletter email input', () => {
    cy.get('#newsletter-email-input')
      .should('be.visible')
      .and('have.attr', 'type', 'email');
  });

  it('Should allow typing in newsletter input', () => {
    cy.get('#newsletter-email-input')
      .type('test@gmail.com')
      .should('have.value', 'test@gmail.com');
  });

  it('Should display subscribe button', () => {
    cy.get('#newsletter-subscribe-btn')
      .should('be.visible')
      .and('contain.text', 'Subscribe Now');
  });

  
  // FOOTER TEST
  

  it('Should display footer component', () => {
    cy.get('app-footer').should('exist');
  });

});