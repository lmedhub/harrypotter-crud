describe("User flow", () => {
  it("User has active session", () => {
    cy.setCookie(
      "next-auth.session-token",
      "b3b05b40-90eb-4e7b-88b8-03a42e1c28a1"
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
