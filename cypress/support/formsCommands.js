Cypress.Commands.add("irAlFormularioReserva", () => {

  // Busco el primer botón "Book now"
  cy.contains("Book now")
    .first()
    .click();

  // Verifico que vaya a una URL de reservación
  cy.url()
    .should("include", "/reservation/");

  // Hago click en Reserve Now
  cy.get("#doReservation")
    .should("be.visible")
    .click();

  // Verifico que el formulario esté visible
  cy.get('input[name="firstname"]')
    .should("be.visible");

});

Cypress.Commands.add('completarFormularioReserva', (datos) => {
  cy.get('input[name="firstname"]').type(datos.nombre)
  cy.get('input[name="lastname"]').type(datos.apellido)
  cy.get('input[name="email"]').type(datos.email)
  cy.get('input[name="phone"]').type(datos.telefono)

})


Cypress.Commands.add('obtenerReservaUnaNoche', () => {

  const hoy = new Date()
  const checkin = hoy.toISOString().split('T')[0]
  const checkoutDate = new Date(hoy)
  checkoutDate.setDate(checkoutDate.getDate() + 1)
  const checkout = checkoutDate.toISOString().split('T')[0]
  return cy.wrap({
    checkin,
    checkout
  })

})


Cypress.Commands.add('completarFormularioContacto', (datos) => {

  cy.get('#name').type(datos.nombre)
  cy.get('#email').type(datos.email)
  cy.get('#phone').type(datos.telefono)
  cy.get('#subject').type(datos.asunto)
  cy.get('#description').type(datos.mensaje)
  })
