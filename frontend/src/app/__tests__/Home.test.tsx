import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../page'
import * as gtag from '@/lib/gtag'

jest.mock('@/lib/gtag')

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls the gtag event function on email link click', async () => {
    render(<Home />)
    await userEvent.click(screen.getByRole('link', { name: 'Email Me' }))
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Contact',
      label: 'Email',
      value: 1,
    })
  })
})
