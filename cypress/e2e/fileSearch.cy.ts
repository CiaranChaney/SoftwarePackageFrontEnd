describe('Name Search', () => {
    it('Should search libraries by name', () => {

        cy.intercept('POST', 'https://ciaranchaney.com/upload').as('uploadFile');

        cy.visit('https://www.hashveritas.com/library/', {failOnStatusCode: false});

        cy.get('#formFile').selectFile('spring-boot-starter-web-3.2.3.jar')
        cy.get('.btn-dark:nth-child(1)').click();

        cy.contains('Uploading file...').should('be.visible');

        cy.wait('@uploadFile').its('response.statusCode').should('eq', 200);

        cy.contains('File uploaded successfully!').should('be.visible');


    });
});