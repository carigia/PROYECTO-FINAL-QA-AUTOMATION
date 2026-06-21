describe('3.1 Reserva exitosa como usuario invitado', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });  
    beforeEach(()=>{
      cy.visit('https://automationintesting.online')
    })
    it('debe mostrar habitaciones disponibles en la página principal', () => {
     // Verifica el título de la sección de habitaciones
      cy.contains('Our Rooms').should('be.visible')
      cy.get('.row.g-4').should('be.visible')
      cy.get('.row.g-4').should('have.length',3)
     })



     it('Completar el formulario con datos válidos (nombre, apellido, email, teléfono y fechas)', () => {
    cy.contains('Book now').first().click()

cy.url().should('include', '/reservation/')

 cy.get('#doReservation').should('be.visible').click()


cy.get('input[name="firstname"]')
  .should('be.visible')

      cy.fixture('reserva').then((datos) => {

    cy.get('input[name="firstname"]').type(datos.nombre)
    cy.get('input[name="lastname"]').type(datos.apellido)
    cy.get('input[name="email"]').type(datos.email)
    cy.get('input[name="phone"]').type(datos.telefono)
    
     })
     })
  })
})

  

 
