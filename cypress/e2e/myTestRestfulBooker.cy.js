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




        describe('3.2 Validaciones del formulario de reserva', () => {

      Cypress.on('uncaught:exception', () => false)

      beforeEach(() => {
        cy.visit('https://automationintesting.online')
      })

      it('No debe permitir enviar el formulario vacío', () => {

        //pasos a seguir: abrir una habitacion,verificar que cargo la pag, ir al formulario,
        //click en reserve now, dar otro click en el mismo boton para intentar enviar el formulario vacio
      
        
        cy.contains('Book now').first().click()
        cy.url().should('include', '/reservation/')
        cy.scrollTo('bottom')
        cy.contains('Reserve Now').click()
        cy.contains('Reserve Now').click()
        cy.url().should('include', '/reservation/')
        cy.get('input').should('have.length.at.least', 4)


   it('3.2.1 Verificar que aparecen los mensajes de error correspondientes', () => {

    cy.contains('Book now').first().click()
    cy.url().should('include', '/reservation/')
    cy.scrollTo('bottom')


    cy.contains('Reserve Now').click()
    cy.contains('Reserve Now').click()

    
    cy.contains('Firstname should not be blank').should('be.visible')
    cy.contains('Lastname should not be blank').should('be.visible')
    cy.contains('must not be empty').should('be.visible')
    cy.contains('size must be between 3 and 30').should('be.visible')
    cy.contains('size must be between 11 and 21').should('be.visible')
    cy.contains('size must be between 3 and 18').should('be.visible')

  })

  it('3.2.2 Verificar que no se realizó ninguna reserva', () => {

    cy.contains('Book now').first().click()
    cy.url().should('include', '/reservation/')
    cy.scrollTo('bottom')

  
    cy.contains('Reserve Now').click()
    cy.contains('Reserve Now').click()

    cy.url().should('include', '/reservation/')
    cy.contains('Booking Successful').should('not.exist')

  })



      })

    })


      })

 