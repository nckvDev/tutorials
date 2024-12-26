const { test, expect } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

test.describe('Note app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'log in'}).click()

    /* 
      get field input 
      both are problematic to the extent that if the registration form is changed, 
      the tests may break, as they rely on the fields to be on the page in a certain order. 
    */
    // await page.getByRole('textbox').first().fill('mluukkai')
    // await page.getByRole('textbox').last().fill('salainen')

    // const textBoxes = await page.getByRole('textbox').all()
    // await textBoxes[0].fill('mluukkai')
    // await textBoxes[1].fill('salainen')

    /*
      A better solution is to define unique test id attributes for the fields, 
      to search for them in the tests using the method getByTestId.
    */
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  test('user can login with correct credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'wrong')

    // await expect(page.getByText('wrong credentials')).toBeVisible()
    
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page,'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    test.describe('and a note exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('importance can be changed', async ({ page }) => {
        // await page.getByRole('button', { name: 'make not important' }).click()
        // await expect(page.getByText('make important')).toBeVisible()
        await page.pause()
        const otherNoteText = page.getByText('second note')
        const otherNoteElement = otherNoteText.locator('..')

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })

      test('one of those can be made non important', async ({ page }) => {
        // const otherNoteElement = page.getByText('first note')

        // await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        // await expect(otherNoteElement.getByText('make important')).toBeVisible()
        // or
        // await page.getByText('first note').getByRole('button', { name: 'make not important' }).click()
        // await expect(page.getByText('first note').getByText('make important')).toBeVisible()

        const otherNoteElement = page.getByText('first note').locator('..')
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})