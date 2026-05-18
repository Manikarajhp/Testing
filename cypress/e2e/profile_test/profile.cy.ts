/// <reference types="cypress" />

describe('Profile Tests', () => {

  const selectors = {

    editBtn: '#toggle-edit-mode-btn',

    fullname: '#profile-fullname-input',
    email: '#profile-email-input',
    phone: '#profile-phone-input',
    altPhone: '#profile-alt-phone-input',

    gender: '#profile-gender-input',

    address: '#profile-address-input',
    city: '#profile-city-input',
    state: '#profile-state-input',
    country: '#profile-country-select',
    pincode: '#profile-pincode-input',

    actionsContainer: '#profile-actions-container',
    saveBtn: '#profile-save-btn',

    avatar: '#profile-avatar',
    emailSubtitle: '#profile-email-subtitle'

  }



  const readonlyInputs = [
    selectors.fullname,
    selectors.phone,
    selectors.altPhone,
    selectors.address,
    selectors.city,
    selectors.state,
    selectors.pincode
  ]



  function login() {

    cy.visit('http://localhost:4200/login')

    cy.get('#signin-email')
      .type('john@example.com')

    cy.get('#signin-password')
      .type('Password123!')

    cy.get('#signin-submit')
      .click()

  }



  function enableEditMode() {

    cy.get(selectors.editBtn)
      .click()

  }



  function checkReadonly() {

    readonlyInputs.forEach((selector) => {

      cy.get(selector)
        .should('have.attr', 'readonly')

    })

    cy.get(selectors.country)
      .should('have.attr', 'disabled')

  }



  function checkEditable() {

    readonlyInputs.forEach((selector) => {

      cy.get(selector)
        .should('not.have.attr', 'readonly')

    })

    cy.get(selectors.country)
      .should('not.have.attr', 'disabled')

  }



  beforeEach(() => {

    login()
    cy.wait(2000)
    cy.visit('http://localhost:4200/profile')

  })



  
  // PROFILE LOAD
  

  it('should load profile page correctly', () => {

    cy.url()
      .should('include', '/profile')

    cy.get('nav')
      .should('be.visible')

    cy.get(selectors.avatar)
    .should('be.visible')
    .and('have.attr', 'src')
    
    cy.get(selectors.avatar)
      .should('have.attr', 'alt')

    cy.get(selectors.emailSubtitle)
      .should('be.visible')

  })



  
  // READONLY STATE
  

  it('should keep all fields readonly initially', () => {

    checkReadonly()

    cy.get(selectors.actionsContainer)
      .should('not.exist')

  })



  
  // EDIT MODE
  

  it('should enable editing after clicking edit button', () => {

    enableEditMode()

    checkEditable()

    cy.get(selectors.actionsContainer)
      .should('be.visible')

    cy.get(selectors.saveBtn)
      .should('be.visible')

  })



  
  // TOGGLE BUTTON
  

  it('should toggle button text correctly', () => {

    cy.get(selectors.editBtn)
      .should('contain', 'Edit Profile')

    enableEditMode()

    cy.get(selectors.editBtn)
      .should('contain', 'Cancel')

    enableEditMode()

    cy.get(selectors.editBtn)
      .should('contain', 'Edit')

  })



  
  // EMAIL ALWAYS READONLY
  

  it('should keep email readonly always', () => {

    enableEditMode()

    cy.get(selectors.email)
      .should('have.attr', 'readonly')

  })



  
  // RADIO BUTTON TEST
  

  it('should allow selecting gender', () => {

    enableEditMode();

    ['male', 'female', 'other'].forEach((gender) => {

      cy.get(`input[type="radio"][value="${gender}"]`)
        .check({ force: true })
        .should('be.checked')

    })

  })



  
  // FORM UPDATE TEST
  

  it('should update and save profile correctly', () => {

    const formData = {

      fullname: 'Manik Raj',
      phone: '9876543210',
      altPhone: '9999999999',
      address: 'Chennai Tamil Nadu',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001'

    }



    enableEditMode()



    cy.get(selectors.fullname)
      .clear()
      .type(formData.fullname)

    cy.get(selectors.phone)
      .clear()
      .type(formData.phone)

    cy.get(selectors.altPhone)
      .clear()
      .type(formData.altPhone)

    cy.get(selectors.address)
      .clear()
      .type(formData.address)

    cy.get(selectors.city)
      .clear()
      .type(formData.city)

    cy.get(selectors.state)
      .clear()
      .type(formData.state)

    cy.get(selectors.pincode)
      .clear()
      .type(formData.pincode)



    cy.get(selectors.country)
      .select('India')



    cy.get('input[value="male"]')
      .check({ force: true })



    cy.get(selectors.saveBtn)
      .click()



    cy.get(selectors.fullname)
      .should('have.value', formData.fullname)

    cy.get(selectors.phone)
      .should('have.value', formData.phone)

    cy.get(selectors.altPhone)
      .should('have.value', formData.altPhone)

    cy.get(selectors.address)
      .should('have.value', formData.address)

    cy.get(selectors.city)
      .should('have.value', formData.city)

    cy.get(selectors.state)
      .should('have.value', formData.state)

    cy.get(selectors.pincode)
      .should('have.value', formData.pincode)

    cy.get(selectors.country)
      .should('have.value', 'India')

    cy.get('input[value="male"]')
      .should('be.checked')

  })

})