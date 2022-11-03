describe('Books', () => {
    it('can list, show, create, edit and delete books', () => {
        // list books
        cy.visit('/').get('[data-cy=link-to-books]').click()
    })
})