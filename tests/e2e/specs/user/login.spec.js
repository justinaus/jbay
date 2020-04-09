describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
    // we are not logged in
  });

  // get best practice.
  // https://docs.cypress.io/guides/references/best-practices.html

  it('유저 로그인 성공 - 메인 화면으로 이동', () => {
    cy.get('[data-cy="loginId"]').type(Cypress.env('user_id'));
    cy.get('[data-cy="password"]').type(Cypress.env('user_password'));
    cy.get('[data-cy="submit"]').click();

    cy.url().should('contain', '/products');
  });
});
