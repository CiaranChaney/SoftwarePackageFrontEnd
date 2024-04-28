describe('template spec', () => {
    it('should register a user', () => {
        cy.visit('https://www.hashveritas.com/');
        // Wait for the button to be visible and clickable
        cy.get('a.btn.btn-light.btn-lg.p-2', { timeout: 10000 }).should('be.visible').contains('Register').click();

        // Verify the URL after clicking the button
        cy.url().should('include', 'https://www.hashveritas.com/register/');
        cy.get('#username').click().type('cypressTesting57');
        cy.get('#email').click().type('cypressTestin57@email.com');
        cy.get('#password').type('cypressTesting');
        cy.get('.MuiButtonBase-root').click();
        cy.url().should('include', 'https://www.hashveritas.com/Library/');
        cy.contains('cypressTesting57').should('be.visible');
        cy.contains('Logout', { timeout: 10000 }).should('be.visible').click({ force: true });
        cy.contains('Logged out Succefssfully').should('be.visible');

    });
});
