describe("Login form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show valitation error if fields are empty on button click", () => {
    cy.get("[data-cy='login']").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password must be at least 6 characters long").should("be.visible");
  });

  it("should show error for invalid email format", () => {
    cy.get("input[name='email']").type("invalid-email");
    cy.get("input[name='password']").type("pasword123");
    cy.get("[data-cy='login']").click();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("should log in successfully with valid credentials", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
    }).as("loginRequest");
    cy.get("input[name='email']").type("test@mail.com");
    cy.get("input[name='password']").type("pasword123");
    cy.get("[data-cy='login']").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.contains("Your are loggedin").should("be.visible");
  });

  it("should show error message if login fails", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginFail");

    cy.get("input[name='email']").type("wrong@example.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("[data-cy='login']").contains("Log in").click();

    cy.wait("@loginFail").its("response.statusCode").should("eq", 401);
    cy.contains("Invalid credentials").should("be.visible");
  });
});
