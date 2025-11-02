import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LabGridItem from '../LabGridItem'
import { event } from '@/lib/gtag'

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}))

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls the event function on click', async () => {
    const user = userEvent.setup()
    render(<LabGridItem href="/test" title="Test Lab" />)

    const link = screen.getByRole('link', { name: 'Test Lab' })
    await user.click(link)

    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'lab',
      label: 'Test Lab',
      value: 1,
    })
  })
})
