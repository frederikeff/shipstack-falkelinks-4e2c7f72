import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectLink from '../ProjectLink'
import * as gtag from '@/lib/gtag'

jest.mock('@/lib/gtag')

describe('ProjectLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the project link', () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    )
    expect(screen.getByRole('link', { name: 'Example Project logo Example Project' })).toBeInTheDocument()
  })

  it('calls the gtag event function on click', async () => {
    render(
      <ProjectLink
        href="https://example.com"
        title="Example Project"
        imageSrc="https://via.placeholder.com/150"
      />
    )
    await userEvent.click(screen.getByRole('link'))
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Project Link',
      label: 'Example Project',
      value: 1,
    })
  })
})
