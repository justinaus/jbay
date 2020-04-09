describe('/Announce', () => {
  beforeEach(() => {
    cy.visit('/announces');

    // 로그인
  });

  // get best practice.
  // https://docs.cypress.io/guides/references/best-practices.html

  it('필터바 검색대로 주소 변경', () => {
    // 이전 로그인 화면에 같은 엘리먼트가 있어서..
    cy.wait(3000);

    // 옵션 변경.

    cy.url()
      .should('contain', 'status=C')
      .and('contain', 'postCid=11');
  });
});
