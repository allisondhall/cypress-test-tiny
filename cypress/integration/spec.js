describe('Non-deterministic test', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
    	method: 'GET',
    	url: '/todos/*'
    }).as('testCall');
  });

  it('Trigger API call multiple times', () => {
    cy.visit('/');

    cy.contains('Make an API call').click();
    cy.wait('@testCall'); // Fails here despite call appearing in Network tab

    cy.contains('Make an API call').click();
    cy.wait('@testCall');
  });
});
