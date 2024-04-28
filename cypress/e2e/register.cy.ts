describe('template spec', () => {
    it('should register a user', () => {
        cy.visit('https://www.hashveritas.com/');
        // Wait for the button to be visible and clickable
        cy.get('a.btn.btn-light.btn-lg.p-2', { timeout: 10000 }).should('be.visible').contains('Register').click();

        // Verify the URL after clicking the button
        cy.url().should('include', 'https://www.hashveritas.com/register/');

        // No input test - submit the form without filling in the fields
        cy.get('.MuiButtonBase-root').click();

        // Assert that the validation message appears
        cy.get('#username').invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');
        cy.get('#email').invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');
        cy.get('#password').invoke('prop', 'validationMessage')
            .should('equal', 'Please fill in this field.');

        //Email Validation
        cy.get('#username').click().type(`cypressTesting57.${Date.now()}`);
        cy.get('#email').click().type(`cypressTesting.${Date.now()}!email.com`);
        cy.get('#password').type('cypressTesting');
        cy.get('.MuiButtonBase-root').click();
        cy.contains('Invalid email').should('be.visible');

        cy.get('#username').clear();
        cy.get('#email').clear();
        cy.get('#password').clear();

        //Existing user test
        cy.get('#username').click().type(`cypressTesting57`);
        cy.get('#email').click().type(`cypressTesting57email.com`);
        cy.get('#password').type('cypressTesting');
        cy.get('.MuiButtonBase-root').click();
        cy.contains('User already exists with that email or username. Please try again.').should('be.visible');

        cy.get('#username').clear();
        cy.get('#email').clear();
        cy.get('#password').clear();


        cy.get('#username').click().type(`cypressTesting57.${Date.now()}`);
        cy.get('#email').click().type(`cypressTesting.${Date.now()}@email.com`);
        cy.get('#password').type('cypressTesting');
        cy.get('.MuiButtonBase-root').click();
        cy.url().should('include', 'https://www.hashveritas.com/Library/');
        cy.contains('cypressTesting57').should('be.visible');
        cy.contains('Logout', { timeout: 10000 }).should('be.visible').click({ force: true });
        cy.contains('Logged out Succefssfully').should('be.visible');

    });
});
