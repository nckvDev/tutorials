import { render, screen } from "@testing-library/react"
import Toggled from "./Toggled"
import userEvent from "@testing-library/user-event"

describe('<Toggled />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggled buttonLabel='show...'>
        <div className='testDiv'>
          toggled content
        </div>
      </Toggled>
    ).container
  })

  test('tenders its children', async () => {
    await screen.findAllByText('toggled content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggledContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.toggledContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.toggledContent')
    expect(div).toHaveStyle('display: none')
  })
})