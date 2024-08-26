describe("User flow", () => {
  it("User has active session", () => {
    cy.setCookie(
      "next-auth.session-token",
      "83cc1100-df30-41b8-87e3-61be66d89d70"
    );

    cy.visit("/allcharacters");

    cy.contains("Harry Potter Characters").should("be.visible");

    cy.contains("Name: Harry Potter").click();

    cy.url().should("include", "/character/");

    cy.wait(2000);

    cy.get("#fav-button").click();

    cy.wait(2000);

    cy.url().should("include", "/allcharacters");

    cy.contains("Name: Harry Potter").click();

    cy.url().should("include", "/character/");

    cy.wait(2000);

    cy.get("#fav-button").click();

    cy.url().should("include", "/allcharacters");

  });
});
