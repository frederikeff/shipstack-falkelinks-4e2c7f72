import { render, screen } from '@testing-library/react'
import ProjectLink from '../ProjectLink'

describe('ProjectLink', () => {
  it('renders a project link with the correct href and title', () => {
    const project = {
      href: 'https://example.com',
      title: 'Test Project',
      imageSrc: 'https://via.placeholder.com/80',
    }
    render(<ProjectLink {...project} />)

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', project.href)

    const headingElement = screen.getByRole('heading', { name: project.title })
    expect(headingElement).toBeInTheDocument()
  })
})