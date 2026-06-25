// Casos E2E para validar reservas, contacto y endpoints básicos del sitio.
describe("3.1 Reserva exitosa como usuario invitado ", () => {
  // Evita que errores no controlados del sitio corten la ejecución del test.
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    // Abre la aplicación desde cero antes de cada caso.
    cy.visit("https://automationintesting.online");
  });

  afterEach(function () {
    // Guarda evidencia visual del resultado de cada prueba.
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("3.1.1 Navegar a la página principal y verificar que se muestran habitaciones disponibles", () => {
    // Verifica que la sección principal de habitaciones esté presente en la home.
    cy.contains("Our Rooms").should("be.visible");
    // Confirma que el contenedor visual de habitaciones se renderizó correctamente.
    cy.get(".row.g-4").should("be.visible");
    // Valida que inicialmente se muestren tres bloques de habitaciones.
    cy.get(".row.g-4").should("have.length", 3);
  });

  it("3.1.2 Seleccionar una habitación y abrir el formulario de reserva)", () => {
    // Usa el comando custom para navegar hasta el formulario de reserva.
    cy.irAlFormularioReserva();
    // Verifica que los campos mínimos del huésped estén visibles antes de completar datos.
    cy.get('input[name="firstname"]').should("be.visible");
    cy.get('input[name="lastname"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="phone"]').should("be.visible");
  });

  it("3.1.3 Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)", () => {
    // Abre el flujo de reserva hasta dejar visible el formulario.
    cy.irAlFormularioReserva();

    // Carga datos de prueba y los usa para completar la reserva.
    cy.fixture("reserva").then((datos) => {
      // Delega la carga de campos al comando personalizado reutilizable.
      cy.completarFormularioReserva(datos);
    });
  });

  it("3.1.4 Confirmar la reserva y validar que el mensaje de éxito aparece en pantalla", () => {
    // Ingresa al detalle de la primera habitación disponible.
    cy.contains("Book now").first().click();
    // Comprueba que la navegación llevó a la ruta de reserva.
    cy.url().should("include", "/reservation/");
    // Expande el formulario para comenzar la carga de la reserva.
    cy.get("#doReservation").should("be.visible").click();

    // Lee los parámetros de la URL generados al abrir la reserva.
    cy.location("search").then((search) => {
      const params = new URLSearchParams(search);
    });

    // Confirma que el formulario está visible antes de escribir datos.
    cy.get('input[name="firstname"]').should("be.visible");

    // Busca datos base del fixture para combinarlos con las fechas dinámicas.
    cy.fixture("reserva").then((datos) => {
      // Genera una estadía de una noche y la combina con el fixture.
      cy.obtenerReservaUnaNoche().then((fechas) => {
        datos.checkin = fechas.checkin;
        datos.checkout = fechas.checkout;
        // Completa el formulario con la información final del huésped.
        cy.completarFormularioReserva(datos);
      });

      // Verifica que la URL conserve las fechas esperadas para la reserva.
      cy.location("search").then((search) => {
        const params = new URLSearchParams(search);

        expect(params.get("checkin")).to.equal(datos.checkin);
        expect(params.get("checkout")).to.equal(datos.checkout);
      });

      // Envía la reserva y valida la confirmación final.
      cy.get(".btn-primary.w-100.mb-3")
        .should("contain.text", "Reserve")
        .click();

      // Espera el mensaje final de confirmación para cerrar el flujo exitoso.
      cy.contains("Booking Confirmed", { timeout: 10000 }).should("be.visible");
    });
  });
});

describe("3.2 Validaciones del formulario de reserva", () => {
  // Mantiene la suite estable aunque la app lance excepciones del navegador.
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });

  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("No debe permitir enviar el formulario vacío", () => {
    // Abre la primera habitación para probar las validaciones del formulario.
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    // Se posiciona al final para encontrar el botón de envío.
    cy.scrollTo("bottom");
    // Intenta enviar sin cargar datos para disparar las validaciones.
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    // Verifica que la app permanezca en la página de reserva.
    cy.url().should("include", "/reservation/");
    // Confirma que los inputs del formulario siguen presentes.
    cy.get("input").should("have.length.at.least", 4);
  });

  it("3.2.1 Verificar que aparecen los mensajes de error correspondientes", () => {
    // Navega al formulario de reserva sin completar campos obligatorios.
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.scrollTo("bottom");
    // Fuerza el envío vacío para que aparezcan los mensajes de validación.
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    // Valida mensajes específicos asociados a campos requeridos y formatos esperados.
    cy.contains("Firstname should not be blank").should("be.visible");
    cy.contains("Lastname should not be blank").should("be.visible");
    cy.contains("must not be empty").should("be.visible");
    cy.contains("size must be between 3 and 30").should("be.visible");
    cy.contains("size must be between 11 and 21").should("be.visible");
    cy.contains("size must be between 3 and 18").should("be.visible");
  });

  it("3.2.2 Verificar que no se realizó ninguna reserva", () => {
    // Repite el envío inválido para confirmar que no se genera una reserva real.
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.scrollTo("bottom");
    cy.contains("Reserve Now").click();
    cy.contains("Reserve Now").click();
    // Sigue en el mismo flujo porque la operación no fue exitosa.
    cy.url().should("include", "/reservation/");
    // Verifica que nunca aparezca el mensaje de éxito de reserva.
    cy.contains("Booking Successful").should("not.exist");
  });
});

// Casos adicionales para aislar carga de datos y envío del formulario.
describe("3.2 (Adicional) Completar formulario", () => {
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });

  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("Completar el formulario con datos válidos", () => {
    // Abre manualmente el flujo de reserva para aislar la carga del formulario.
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
    // Verifica que el formulario esté listo antes de ingresar datos.
    cy.get('input[name="firstname"]').should("be.visible");

    cy.fixture("reserva").then((datos) => {
      // Completa el formulario sin enviarlo para validar solo la carga de datos.
      cy.completarFormularioReserva(datos);
    });
  });

  it("Confirmar la reserva", () => {
    // Recorre el flujo manual de reserva para probar el envío final.
    cy.contains("Book now").first().click();
    cy.url().should("include", "/reservation/");
    cy.get("#doReservation").should("be.visible").click();
    cy.get('input[name="firstname"]').should("be.visible");

    cy.fixture("reserva").then((datos) => {
      // Carga los datos válidos del huésped.
      cy.completarFormularioReserva(datos);
      // Ejecuta el submit del formulario desde el botón principal.
      cy.get(".btn-primary.w-100.mb-3")
        .should("contain.text", "Reserve")
        .click();
    });
  });
});

// Casos E2E del formulario de contacto público.
describe("3.3 Formulario de contacto", () => {
  Cypress.on("uncaught:exception", () => false);

  beforeEach(() => {
    cy.visit("https://automationintesting.online");
  });

  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("3.3.1 Completar el formulario de contacto con datos válidos", () => {
    // Obtiene datos válidos del fixture para el formulario de contacto.
    cy.fixture("contacto").then((datos) => {
      // Completa todos los campos visibles del formulario público.
      cy.completarFormularioContacto(datos);
    });
  });

  it("3.3.2 Enviar el mensaje y validar que se muestra la confirmación", () => {
    // Carga datos válidos para poder enviar el formulario de contacto.
    cy.fixture("contacto").then((datos) => {
      cy.completarFormularioContacto(datos);
      // Envía el formulario usando el botón visible para el usuario.
      cy.contains("Submit").click();
      // Verifica que la aplicación muestre el mensaje de confirmación esperado.
      cy.contains("Thanks for getting in touch").should("be.visible");
    });
  });
});

// Casos de API para verificar endpoints principales sin pasar por la UI.
describe("Suite de Pruebas de API - Shady Meadows", () => {
  it("CP-24: Debe obtener la lista de habitaciones (GET)", () => {
    // Consulta el endpoint público de habitaciones.
    cy.request("GET", "https://automationintesting.online/api/room/").then((response) => {
      // Valida que la API responda exitosamente.
      expect(response.status).to.eq(200);
    });
  });

  afterEach(function () {
    cy.screenshot(`${this.currentTest.title}-${this.currentTest.state}`);
  });

  it("CP-25: Debe manejar el envío de booking vacío", () => {
    // Intenta crear una reserva sin payload para validar el manejo de error.
    cy.request({
      method: "POST",
      url: "https://automationintesting.online/api/booking/",
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      // Acepta cualquier respuesta de error controlada por la API.
      expect(response.status).to.be.gte(400);
    });
  });

  it("CP-26: Debe loguearse exitosamente como admin", () => {
    // Envía credenciales válidas al endpoint de autenticación.
    cy.request("POST", "https://automationintesting.online/api/auth/login", {
      username: "admin",
      password: "password",
    }).then((response) => {
      // Verifica que el login responda correctamente.
      expect(response.status).to.eq(200);
    });
  });
});
