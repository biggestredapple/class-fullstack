describe("E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Verify that a new value can be successfully added", () => {
    cy.get("[data-cy=add-btn]").click();
    cy.get("[data-cy=add-modal]").should("exist");
    cy.get("[data-cy=title-input]").type("test title");
    cy.get("[data-cy=instruction-input]").type("test instruction");
    cy.get("[data-cy=ingredient-input]")
      .type("test ingredient")
      .get("[data-cy=ingredient-add-btn]")
      .click();
    cy.get("[data-cy=save-btn]").click().get("[data-cy=confirm-btn]").click();
    cy.contains("test instruction").should("exist");
  });

  it("Verify that an added value can be updated", () => {
    cy.get("[data-cy=edit-btn-0]").click();
    cy.get("[data-cy=title-input] input").clear().type("updated title");
    cy.get("[data-cy=instruction-input] input")
      .clear()
      .type("updated instruction");
    cy.get("[data-cy=ingredient-input]")
      .type("updated ingredient")
      .get("[data-cy=ingredient-add-btn]")
      .click();
    cy.get("[data-cy=save-btn]").click().get("[data-cy=confirm-btn]").click();
    cy.contains("updated instruction").should("exist");
  });

  it("Search with a valid keyword and verify relevant search results", () => {
    cy.get("[data-cy=search-input] input").clear().type("updated title");
    cy.get("table tbody tr").should("have.length", 1);
    cy.contains("updated title").should("exist");
    cy.get("[data-cy=search-input] input").clear().type("search example");
    cy.get("table tbody tr").should("have.length", 0);
  });

  it("Verify delete function", () => {
    cy.get("[data-cy=delete-btn-0]")
      .click()
      .get("[data-cy=confirm-btn]")
      .click();
    cy.get("table tbody tr").should("have.length", 0);
  });
});
