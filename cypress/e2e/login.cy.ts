describe('login', () => {
  it('should login a user', () => {
    cy.visit('https://www.hashveritas.com/');

    cy.get('a.btn.btn-light.btn-lg.p-2', { timeout: 10000 }).should('be.visible').contains('Login').click();

    // Verify the URL after clicking the button
    cy.url().should('include', 'https://www.hashveritas.com/login/');

    // No input test - submit the form without filling in the fields
    cy.get('.MuiButtonBase-root').click();

    // Assert that the validation message appears
    cy.get('#username').invoke('prop', 'validationMessage')
        .should('equal', 'Please fill in this field.');
    cy.get('#password').invoke('prop', 'validationMessage')
        .should('equal', 'Please fill in this field.');

    //Username error validation
    cy.get('#username').click().type('cypressTest3333');
    cy.get('#password').type('cypressTesting');
    cy.get('.MuiButtonBase-root').click();
    cy.contains('Invalid username or password').should('be.visible')
    cy.get('#username').clear();
    cy.get('#password').clear();

    //Password error validation
    cy.get('#username').click().type('cypressTesting');
    cy.get('#password').type('cypressErorrTest');
    cy.get('.MuiButtonBase-root').click();
    cy.contains('Invalid username or password').should('be.visible')
    cy.get('#username').clear();
    cy.get('#password').clear();

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
