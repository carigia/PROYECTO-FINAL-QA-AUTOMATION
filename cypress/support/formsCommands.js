Cypress.Commands.add('completarFormularioReserva', (datos) => {
  cy.get('input[name="firstname"]').type(datos.nombre)
  cy.get('input[name="lastname"]').type(datos.apellido)
  cy.get('input[name="email"]').type(datos.email)
  cy.get('input[name="phone"]').type(datos.telefono)
// cy.get('input[name="checkin"]').type(datos.checkin)
//  cy.get('input[name="checkout"]').type(datos.checkout)
})


Cypress.Commands.add('completarFormularioContacto', (datos) => {

  cy.get('#name').type(datos.nombre)
  cy.get('#email').type(datos.email)
  cy.get('#phone').type(datos.telefono)
  cy.get('#subject').type(datos.asunto)
  cy.get('#description').type(datos.mensaje)
  

 // cy.get('input[name="name"]').type(datos.nombre)
 // cy.get('input[name="email"]').type(datos.email)
 // cy.get('input[name="phone"]').type(datos.telefono)
 //cy.get('input[name="subject"]').type(datos.asunto)
  //cy.get('input[name="description"]').type(datos.mensaje)
  
})
