import { registerForm } from '../../src/utils/constants'

// Test suite for the Register Form
describe('Test - Register Form', () => {
  // Visit the initial page before each test
  beforeEach(() => {
    cy.visit(`http://localhost:5173`)
  })

  // Confirm that the heading for the form is shown
  it('Confirm form is shown.', () => {
    cy.get('h1').should('exist').should('have.text', registerForm.title)
  })
})
