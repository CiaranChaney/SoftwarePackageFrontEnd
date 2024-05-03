describe('Admin Panel Page', () => {

    let adminPassword: string;

    before(() => {
        // Retrieve the password before tests run
        adminPassword = Cypress.env('cypressAdminPassword');
    });

    it('Should not allow unauthed access', () => {

        cy.visit('https://www.hashveritas.com/adminpanel/', {failOnStatusCode: false});
        cy.url().should('include', '/login');

    });

    it('Should navigate to login to admin', () => {
        cy.visit('https://www.hashveritas.com');
        cy.get('a.btn.btn-light.btn-lg.p-2', {timeout: 10000}).should('be.visible').contains('Login').click();

        cy.get('#username').click().type('cypressTestingAdmin');

        const adminPassword = Cypress.env('cypressAdminPassword');
        cy.get('#password').type(adminPassword);

        cy.intercept('POST', 'https://ciaranchaney.com/login').as('loginRequest');

        cy.get('.MuiButtonBase-root').click();

        cy.wait('@loginRequest').then((interception) => {
            const token = interception.response.body.token;
            Cypress.env('token', token);
            cy.window().then((win) => {
                win.localStorage.setItem('token', token);
            });
        });

        cy.url().should('include', 'https://www.hashveritas.com/library/');

        cy.visit('https://www.hashveritas.com/adminpanel/', {failOnStatusCode: false});
        cy.url().should('include', '/adminpanel');
    });

    it('Should add user', () => {
        let token = Cypress.env('token');

        cy.window().then((win) => {
            win.localStorage.setItem('token', token);
        });

        cy.visit('https://www.hashveritas.com/adminpanel/', {failOnStatusCode: false});
        cy.url().should('include', '/adminpanel');

        cy.get('a[href="/addUser"]').click();

        cy.get('#username').click();
        cy.get('#username').type('e2eCypressTest');

        cy.get('#email').click();
        cy.get('#email').type('e2eCypressTest@email.com');

        cy.get('#password').click();
        cy.get('#password').type('e2eCypressTest');

        cy.get('#role').click();
        cy.get('#role').type('USER');

        cy.get('.MuiButtonBase-root').click();


    });

    it('Should edit user', () => {
        let token = Cypress.env('token');

        cy.window().then((win) => {
            win.localStorage.setItem('token', token);
        });

        cy.visit('https://www.hashveritas.com/adminpanel/', {failOnStatusCode: false});
        cy.url().should('include', '/adminpanel');

        cy.get('table')
            .contains('td', 'e2eCypressTest')
            .parent('tr')
            .within(() => {
                // Find and click the edit button
                cy.get('.btn-secondary').click();
            });


        cy.get('#username').click();
        cy.get('#username').clear();
        cy.get('#username').type('e2eCypressTestEdited');
        cy.get('.MuiButtonBase-root').click();

        cy.url().should('contains', 'https://www.hashveritas.com/AdminPanel/');


    });

    it('Should delete user', () => {

        let token = Cypress.env('token');

        cy.window().then((win) => {
            win.localStorage.setItem('token', token);
        });

        cy.visit('https://www.hashveritas.com/adminpanel/', { failOnStatusCode: false });

        cy.url().should('include', '/adminpanel');

        cy.on('window:confirm', () => true);

        cy.get('table')
            .contains('td', 'e2eCypressTestEdited')
            .parent('tr')
            .within(() => {
                // Find and click the delete button
                cy.get('.btn-danger').click();
            });

    });


});
