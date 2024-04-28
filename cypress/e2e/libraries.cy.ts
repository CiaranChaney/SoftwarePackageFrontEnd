describe('Libraries page', () => {
    it('Should navigate to libraries', () => {
        cy.visit('https://www.hashveritas.com/');
        // Wait for the button to be visible and clickable
        cy.get('a.btn.btn-light.btn-lg.p-2', { timeout: 10000 }).should('be.visible').contains('Libraries').click();

        // Verify the URL after clicking the button
        cy.url().should('include', 'https://www.hashveritas.com/library/');

    });
});
