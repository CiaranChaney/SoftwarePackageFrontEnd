describe('login', () => {
  it('should login a user', () => {
    cy.visit('https://www.hashveritas.com/');
    // Wait for the button to be visible and clickable
    cy.get('a.btn.btn-light.btn-lg.p-2', { timeout: 10000 }).should('be.visible').contains('Login').click();

    // Verify the URL after clicking the button
    cy.url().should('include', 'https://www.hashveritas.com/login/');
    cy.get('#username').click().type('cypressTesting');
    cy.get('#password').type('cypressTesting');
    cy.get('.MuiButtonBase-root').click();
    cy.url().should('include', 'https://www.hashveritas.com/library/');
    cy.contains('Logged in Succefssfully').should('be.visible');
    cy.contains('cypressTesting').should('be.visible');
    cy.contains('Logout', { timeout: 10000 }).should('be.visible').click({ force: true });
    cy.contains('Logged out Succefssfully').should('be.visible');

  });
});
