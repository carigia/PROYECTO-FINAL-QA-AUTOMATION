describe("3.1 Reserva exitosa como usuario invitado ", () => {
  Cypress.on("uncaught:exception", () => false);
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });
  it("3.1.1 debe mostrar habitaciones disponibles en la página principal", () => {
    // Verifica el título de la sección de habitaciones
    cy.contains("Our Rooms").should("be.visible");
    cy.get(".row.g-4").should("be.visible");
    cy.get(".row.g-4").should("have.length", 3);
  });
  it("3.1.2 y 3.1.3 Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)", () => {
    //Busco el primer elemento que contenga book now y hago click
    cy.contains("Book now").first().click();
    //verifico que vaya a una url de reservación
    cy.url().should("include", "/reservation/");
    // Reviso que esté visible el botón para reservar y hago click
    cy.get("#doReservation").should("be.visible").click();
    // verifico que se vea el input de firstname que es el primero del formulario
    cy.get('input[name="firstname"]').should("be.visible");

    cy.fixture("reserva").then((datos) => {
      cy.completarFormularioReserva(datos);
    });
  });
  it("3.1.4 Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
    cy.get('input[name="firstname"]').should("be.visible");

    //Busco comando que rellena reserva
    cy.fixture("reserva").then((datos) => {
      cy.completarFormularioReserva(datos);

      cy.get(".btn-primary.w-100.mb-3")
        .should("contain.text", "Reserve")
        .click();

      // cy.contains('Booking Confirmed').should('be.visible')

      //cy.contains('Your booking has been confirmed for the following dates:')
      //.should('be.visible').and('include.text', `${datos.checkin} - ${datos.checkout}`)
    });
  });


describe("3.2 Validaciones del formulario de reserva", () => {
  Cypress.on("uncaught:exception", () => false);
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("No debe permitir enviar el formulario vacío", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.scrollTo("bottom");
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    cy.url().should("include", "/reservation/");
    cy.get("input").should("have.length.at.least", 4);
  });

  it("3.2.1 Verificar que aparecen los mensajes de error correspondientes", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.scrollTo("bottom");
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    cy.contains("Firstname should not be blank").should("be.visible");
    cy.contains("Lastname should not be blank").should("be.visible");
    cy.contains("must not be empty").should("be.visible");
    cy.contains("size must be between 3 and 30").should("be.visible");
    cy.contains("size must be between 11 and 21").should("be.visible");
    cy.contains("size must be between 3 and 18").should("be.visible");
  });

  it("3.2.2 Verificar que no se realizó ninguna reserva", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.scrollTo("bottom");
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    cy.url().should("include", "/reservation/");
    cy.contains("Booking Successful").should("not.exist");
  });
});

describe("3.2 (Adicional) Completar formulario", () => {
  Cypress.on("uncaught:exception", () => false);
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });
  it("Completar el formulario con datos válidos", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
    cy.get('input[name="firstname"]').should("be.visible");
    cy.fixture("reserva").then((datos) => {
      cy.completarFormularioReserva(datos);
    });
  });
  it("Confirmar la reserva", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
    cy.get('input[name="firstname"]').should("be.visible");
    cy.fixture("reserva").then((datos) => {
      cy.completarFormularioReserva(datos);
      cy.get(".btn-primary.w-100.mb-3")
        .should("contain.text", "Reserve")
        .click();
    });
  });
});
describe("3.3 Formulario de contacto", () => {
  Cypress.on("uncaught:exception", () => false);
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });
  it("Completar el formulario de contacto con datos válidos", () => {
    cy.fixture("contacto").then((datos) => {
      cy.completarFormularioContacto(datos);
    });
  });
});
});
