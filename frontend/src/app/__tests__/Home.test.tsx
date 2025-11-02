import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'
import { event } from '@/lib/gtag'

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}))

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls the event function on email link click', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const link = screen.getByRole('link', { name: 'Email Me' })
    await user.click(link)

    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'contact',
      label: 'email',
      value: 1,
    })
  })
})
