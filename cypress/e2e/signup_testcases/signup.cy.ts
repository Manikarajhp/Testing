/// <reference types="cypress" />

describe('Signup functionality tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
        cy.get('#auth-toggle-link').click();
    })

    afterEach(function () {

      if (this.currentTest?.state === 'failed') {
    
        cy.screenshot(this.currentTest.title)
    
      }
    
    })

    function signup_username(name: string){
        cy.get("#signup-username").type(name);
    }
    function signup_email(email : string){
        cy.get("#signup-email").type(email);
    }
    function signup_password(password : string){
        cy.get("#signup-password").type(password);
    }
    function signup_confirmpassword(password : string){
        cy.get("#signup-confirm-password").type(password);
    }
    function signup_submit(){
        cy.get("#signup-submit").click();
    }
    function signup_submit_disable(){
        cy.get("#signup-submit").should('be.disabled');
    }



    //form test
    it('Valid username, email and password and signup to the application', () => {
        signup_username('john')
        signup_email('john1@example.com')
        signup_password('Password123!')
        signup_confirmpassword('Password123!')
        signup_submit();

        cy.url().should('include','/home');
    })

    it('Signup with empty username', () => {
        signup_email('john1@example.com')
        signup_password('Password123!')
        signup_confirmpassword('Password123!')
        signup_submit_disable();
    })
    
    it('Signup with empty email', () => {
        signup_username('john')
        signup_password('Password123!')
        signup_confirmpassword('Password123!')
        signup_submit_disable();
    })

    it('Signup with empty Password', () => {
        signup_username('john')
        signup_email('john1@example.com')
        signup_password('Password123!')
        signup_submit_disable();
    })

    it('Signup with empty confirm Password', () => {
        signup_username('john')
        signup_email('john1@example.com')
        signup_confirmpassword('Password123!')
        signup_submit_disable();
    })

    // test username input field
    it('Username on focus', () => {
        cy.get('#signup-username').focus().blur();
        cy.get('#signup-username-error').should('be.visible')
        signup_submit_disable();
    })

    const usernames = ['a', 'aa', 'qwertyuiopasdfghjkl']

    usernames.forEach(name => {
        it(`username test with ${name}`, () => {
            signup_username(name);
            cy.get("#signup-username-error").should('be.visible');
            signup_submit_disable();
        })
    })

    //test email input field

    it('Email on focus', () => {
        cy.get('#signup-email').focus().blur();
        cy.get('#signup-email-error').should('be.visible')
        signup_submit_disable();
    })

    const emails = ['john1example.com', 'john.doe', '@example.com', '@', 'john@@gmail.com', '#$%^&', '234567', 'abc']

    emails.forEach(email => {
        it(`email test with ${email}`, () => {
            signup_email(email);
            cy.get("#signup-email-error").should('be.visible');
            signup_submit_disable();
        })
    })

    //test password input field
    it('Password on focus', () => {
        cy.get('#signup-password').focus().blur();
        cy.get('#signup-password-error').should('be.visible')
        signup_submit_disable();
    })

    const passwords = ['ansjduer', 'ashdyeAS', 'asdASD@#', '12343234', '@#$%^&*(', 'ASDFGHJK', '123@#$AS']

    passwords.forEach(password => {
        it(`password test with ${password}`, () => {
            signup_password(password);
            cy.get("#signup-password-error").should('be.visible');
            signup_submit_disable();
        })
    })

    //test confirm password input field
    it('Confirm Password on focus', () => {
        cy.get('#signup-confirm-password').focus().blur();
        cy.get('#signup-confirm-password-error').should('be.visible');
        signup_submit_disable();
    })

    const confirm_passwords = ['ansjduer', 'ashdyeAS', 'asdASD@#', '12343234', '@#$%^&*(', 'ASDFGHJK', '123@#$AS']

    confirm_passwords.forEach(password => {
        it(`confirm password test with ${password}`, () => {
            signup_confirmpassword(password);
            cy.get("#signup-confirm-password-error").should('be.visible');
            signup_submit_disable();
        })
    })

    //test password and confirm password not match
    it('Password and confirm password not match', () => {
        signup_password('Password123!')
        signup_confirmpassword('Password123@')
        cy.get("#signup-confirm-password-error").should('be.visible');
        signup_submit_disable();
    })
})