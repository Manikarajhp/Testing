/// <reference types="cypress" />

describe('AlertOps tests', () => {

    it('get the all products', () => {
        cy.request({
            url: 'https://fakestoreapi.com/products',
            method: 'GET',
        }).then((response) => {
            cy.log(response.body);
        })
    })

    it('get single product', () => {
        cy.request({
            url: 'https://fakestoreapi.com/products/1',
            method: 'GET',
        }).then((response) => {
            cy.log(response.body);
        })
    })

    it('Add product', () => {
        cy.request({
            url : 'https://fakestoreapi.com/products',
            method : 'POST',
            body : {
                "id": 21,
                "title": "string",
                "price": 0.1,
                "description": "string",
                "category": "string",
                "image": "http://example.com"
            }
        }).then((res) => {
            console.log(res.body);            
            expect(res.status).to.equal(201);
        })
    })

    it('Test alertops', () => {
        cy.request({
            method : 'GET',
            url : 'https://app.dev.alertops.com/api/v2/alert_types/7760/fields',
            failOnStatusCode: false,
            headers : {
                'API-KEY' : '937d08f7-f8f6-4e3d-8e46-0f826694265a',
                'Content-Type' : 'application/json',          
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res.body.errors[0].message));
            expect(res.status).to.eq(404);
            expect(res.body.errors[0].message).to.eq('AlertType: 7760 not found')
        })
    })

    it.only('Test alertops organization', () => {
        cy.visit('https://app.dev.alertops.com/org/account');
        const subdomain = 'internsdemo';
        cy.get('#subdomain').type(subdomain)
        cy.get('#subdomain_page_continue_button').click();
        cy.url().should('include', '/login');

        cy.get('#login_page_username_input').type('manikarajk@alertops.com')
        cy.get('#login_page_password_input').type('Password')
        cy.get('#login_page_main_login_button').click();

        cy.url().should('include', '/dashboard')        
    })

})



