describe('Name Search', () => {
    it('Should search libraries by name', () => {

        cy.intercept('POST', 'https://ciaranchaney.com/upload').as('uploadFile');

        cy.visit('https://www.hashveritas.com/library/', {failOnStatusCode: false});

        //No file test
        cy.get('.btn-dark:nth-child(1)').click();
        cy.contains('Please select a file to upload.').should('be.visible');

        cy.get('#formFile').selectFile('spring-boot-starter-web-3.2.3.jar')
        cy.get('.btn-dark:nth-child(1)').click();

        cy.contains('Uploading file...').should('be.visible');

        cy.wait('@uploadFile').its('response.statusCode').should('eq', 200);

        cy.contains('File uploaded successfully!').should('be.visible');
        cy.get('#\\3Ar1\\3A').should('have.value', '00b4a4a5a6add08aa57340fb69fc551b4aeff66deef349a47139558ea8108014');

    });
});