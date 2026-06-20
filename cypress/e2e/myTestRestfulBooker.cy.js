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
  })

 