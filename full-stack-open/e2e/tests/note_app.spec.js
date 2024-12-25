const { test, expect } = require("@playwright/test");

test.describe('Note app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
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
    // await page.getByRole('textbox').first().fill('root')
    // await page.getByRole('textbox').last().fill('salainen')

    // const textBoxes = await page.getByRole('textbox').all()
    // await textBoxes[0].fill('root')
    // await textBoxes[1].fill('salainen')

    /*
      A better solution is to define unique test id attributes for the fields, 
      to search for them in the tests using the method getByTestId.
    */
    await page.getByTestId('username').fill('root')
    await page.getByTestId('password').fill('salainen')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Superuser logged-in')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('root')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Superuser logged-in')).toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
})