describe("3.1 Reserva exitosa como usuario invitado ", () => {
  Cypress.on("uncaught:exception", () => false);
  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });
  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });
  
  it("3.1.1 Navegar a la página principal y verificar que se muestran habitaciones disponibles", () => {
    // Verifica el título de la sección de habitaciones
    cy.contains("Our Rooms").should("be.visible");
    cy.get(".row.g-4").should("be.visible");
    cy.get(".row.g-4").should("have.length", 3);
  });


  it("3.1.2 Seleccionar una habitación y abrir el formulario de reserva)", () => {
   cy.irAlFormularioReserva();
     cy.get('input[name="firstname"]').should("be.visible");
  cy.get('input[name="lastname"]').should("be.visible");
  cy.get('input[name="email"]').should("be.visible");
  cy.get('input[name="phone"]').should("be.visible");
  });


it("3.1.3 Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)", () => {
  cy.irAlFormularioReserva();
    cy.fixture("reserva").then((datos) => {
      cy.completarFormularioReserva(datos);
    });
  });


  it("3.1.4 Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla", () => {
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
cy.location('search').then(search => {
  const params = new URLSearchParams(search)

 
})

       cy.get('input[name="firstname"]').should("be.visible");

    //Busco comando que rellena reserva
    cy.fixture("reserva").then((datos) => {
       cy.obtenerReservaUnaNoche().then((fechas) => {
    datos.checkin = fechas.checkin
    datos.checkout = fechas.checkout
      cy.completarFormularioReserva(datos);
     });
     
      cy.location('search').then((search) => {
    const params = new URLSearchParams(search);

    expect(params.get('checkin')).to.equal(datos.checkin);
    expect(params.get('checkout')).to.equal(datos.checkout);
  });

      cy.get(".btn-primary.w-100.mb-3")
        .should("contain.text", "Reserve")
        .click();

      cy.contains('Booking Confirmed', { timeout: 10000 })
  .should('be.visible')

     
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
  it("3.3.1 Completar el formulario de contacto con datos válidos", () => {
    cy.fixture("contacto").then((datos) => {
      cy.completarFormularioContacto(datos);
    });
  });

  it("3.3.2 Enviar el mensaje y validar que se muestra la confirmación", () => {
    cy.fixture("contacto").then((datos) => {
      cy.completarFormularioContacto(datos);
 

    cy.contains("Submit").click();
    cy.contains('Thanks for getting in touch').should('be.visible');
    });
  });


});
});
