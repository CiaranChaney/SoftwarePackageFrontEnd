describe('Name Search', () => {
    it('Should search libraries by name', () => {

        cy.intercept('GET', 'https://ciaranchaney.com/searchLibrary?query=talenteca').as('searchLibrary');

        cy.visit('https://www.hashveritas.com/library/', {failOnStatusCode: false});

        cy.get('#\\3Ar0\\3A').click();
        cy.get('#\\3Ar0\\3A').type('talenteca');
        cy.get('.col-md-6 > .btn').click();

        cy.wait('@searchLibrary').its('response.statusCode').should('eq', 200);


        cy.contains('com.talenteca:olon-mapper_2.11').should('be.visible');


    });
});