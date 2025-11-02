import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectLink from '../ProjectLink'
import { event } from '@/lib/gtag'

jest.mock('@/lib/gtag', () => ({
  event: jest.fn(),
}))

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls the event function on click', async () => {
    const user = userEvent.setup()
    render(
      <ProjectLink
        href="https://example.com"
        title="Test Project"
        imageSrc="https://via.placeholder.com/150"
      />
    )

    const link = screen.getByRole('link', { name: 'Test Project logo Test Project' })
    await user.click(link)

    expect(event).toHaveBeenCalledWith({
      action: 'click',
      category: 'project',
      label: 'Test Project',
      value: 1,
    })
  })
})
