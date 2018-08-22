describe('Non-deterministic test', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
    	method: 'GET',
    	url: '/api/users*'
    }).as('listUsers');

    cy.route({
    	method: 'GET',
    	url: '/api/users/*'
    }).as('singleUser');
  });

  it('Trigger API call multiple times', () => {
    cy.visit('/');
	cy.wait('@listUsers');

	cy.get('.endpoints ul').scrollIntoView();
    cy.get('.endpoints ul li:nth-of-type(1)').click();
    cy.wait('@listUsers');

    cy.get('.endpoints ul li:nth-of-type(2)').click();
    cy.wait('@singleUser');

    cy.get('.endpoints ul li:nth-of-type(1)').click();
    cy.wait('@listUsers');

    cy.get('.endpoints ul li:nth-of-type(2)').click();
    cy.wait('@singleUser');

    cy.get('.endpoints ul li:nth-of-type(1)').click();
    cy.wait('@listUsers');

    cy.get('.endpoints ul li:nth-of-type(2)').click();
    cy.wait('@singleUser');
  });
});
