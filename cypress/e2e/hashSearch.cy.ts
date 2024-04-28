describe('Hash Search', () => {
    it('Should search libraries by hash', () => {

        cy.intercept('GET', 'https://ciaranchaney.com/searchByHash?query=9c348f523ea73643318e17e2883856c193d4ef8e8ec178798ab9417fb12b5ef4')
            .as('searchHash');

        cy.visit('https://www.hashveritas.com/library/', {failOnStatusCode: false});

        cy.get('#\\3Ar1\\3A').click();
        cy.get('#\\3Ar1\\3A').type('9c348f523ea73643318e17e2883856c193d4ef8e8ec178798ab9417fb12b5ef4');
        cy.get('.col-md-12 > .btn').click();


        cy.wait('@searchHash').its('response.statusCode').should('eq', 200);

        cy.contains('io.kevinlee:hedgehog-extra-core_2.13').should('be.visible');



    });
});