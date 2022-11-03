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
        
        // Show book
        // ? ^ sirve para indicar que quiero todos los elementos cuyos data cy comiencen por link-to-visit-book- seguido de cualquier cosa
        cy.get('[data-cy^=link-to-visit-book-]')
            .last()
            .click()
            .get('h1')
            .should('contains.text', 'New book from Cypress')
            .get('[href="/libros"]')
            .click()

        // Edit
        cy.get('[data-cy^=link-to-edit-book-]')
            .last()
            .click()
            .get('[data-cy=input-book-title]')
            .clear()
            .type('Book edited by Cypress')
            .get('[data-cy="button-submit-book"]')
            .click()
            .get('[data-cy=book-list]')
            .contains('Book edited by Cypress')

        // Delete
        cy.get('[data-cy^=link-to-delete-book-]')
            .last()
            .click()
            .get('[data-cy^=link-to-visit-book-]')
            .last().should('not.contain.text', 'Book edited by Cypress')
    })
})