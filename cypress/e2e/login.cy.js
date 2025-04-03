describe("Login form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show valitation error if fields are empty on button click", () => {
    cy.get("[data-cy='login']").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password must be at least 6 characters long").should("be.visible");
  });
});
