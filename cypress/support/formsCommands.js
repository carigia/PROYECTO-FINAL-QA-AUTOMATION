// Navega desde la home hasta dejar visible el formulario de reserva.
Cypress.Commands.add("irAlFormularioReserva", () => {
  // Abre el detalle de la primera habitación disponible.
  cy.contains("Book now")
    .first()
    .click();

  // Confirma que la navegación fue al detalle de reserva.
  cy.url()
    .should("include", "/reservation/");

  // Despliega el formulario de reserva dentro de la habitación elegida.
  cy.get("#doReservation")
    .should("be.visible")
    .click();

  // Verifica que el formulario ya está listo para recibir datos.
  cy.get('input[name="firstname"]')
    .should("be.visible");
});

// Completa los campos principales del formulario de reserva con datos del fixture.
Cypress.Commands.add('completarFormularioReserva', (datos) => {
  // Carga nombre y apellido del huésped.
  cy.get('input[name="firstname"]').type(datos.nombre)
  cy.get('input[name="lastname"]').type(datos.apellido)
  // Completa los datos de contacto requeridos por el formulario.
  cy.get('input[name="email"]').type(datos.email)
  cy.get('input[name="phone"]').type(datos.telefono)
})

// Genera un rango de fechas de una noche para reutilizarlo en las reservas.
Cypress.Commands.add('obtenerReservaUnaNoche', () => {
  // Usa la fecha actual como check-in.
  const hoy = new Date()
  const checkin = hoy.toISOString().split('T')[0]
  // Calcula el check-out sumando una noche a la fecha base.
  const checkoutDate = new Date(hoy)
  checkoutDate.setDate(checkoutDate.getDate() + 1)
  const checkout = checkoutDate.toISOString().split('T')[0]

  // Devuelve ambas fechas envueltas en un comando de Cypress para encadenarlas.
  return cy.wrap({
    checkin,
    checkout
  })
})

// Completa el formulario de contacto con los datos del fixture.
Cypress.Commands.add('completarFormularioContacto', (datos) => {
  // Carga los datos básicos del remitente.
  cy.get('#name').type(datos.nombre)
  cy.get('#email').type(datos.email)
  cy.get('#phone').type(datos.telefono)
  // Completa asunto y descripción del mensaje enviado.
  cy.get('#subject').type(datos.asunto)
  cy.get('#description').type(datos.mensaje)
})
