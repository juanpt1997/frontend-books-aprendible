describe('Books', () => {
    it('can list, show, create, edit and delete books', () => {
        // list books
        cy.visit('/').get('[data-cy=link-to-books]').click()

        // Create books
        cy.get('[href="/libros/crear"]')
            .click()
            .get('[data-cy=input-book-title]')
            .type('New book from Cypress')
            .get('[data-cy="button-submit-book"]')
            .click()
            .get('[data-cy=book-list]')
            .contains('New book from Cypress')
        
        //
    })
})