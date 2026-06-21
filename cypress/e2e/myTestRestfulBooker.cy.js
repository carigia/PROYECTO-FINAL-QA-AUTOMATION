describe("3.1 Reserva exitosa como usuario invitado", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  it("debe mostrar habitaciones disponibles en la página principal", () => {
    // Verifica el título de la sección de habitaciones
    cy.contains("Our Rooms").should("be.visible");
    cy.get(".row.g-4").should("be.visible");
    cy.get(".row.g-4").should("have.length", 3);
  });
  it("Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)", () => {
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
  it("Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla", () => {
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
});
describe("3.2 Validaciones del formulario de reserva", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  it("Completar el formulario sin campos", () => {
    //Busco el primer elemento que contenga book now y hago click
    cy.contains("Book now").first().click();
    //verifico que vaya a una url de reservación
    cy.url().should("include", "/reservation/");
    // Reviso que esté visible el botón para reservar y hago click
    cy.get("#doReservation").should("be.visible").click();
    // verifico que se vea el input de firstname que es el primero del formulario
    cy.get(".btn-primary.w-100.mb-3").should("contain.text", "Reserve").click();
  });
});

describe("3.3 Formulario de contacto", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });

  it("Completar el formulario de contacto con datos válidos", () => {
    cy.fixture("contacto").then((datos) => {
      cy.completarFormularioContacto(datos);
    });
  });
});

