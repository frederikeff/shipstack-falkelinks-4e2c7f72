import { render, screen } from '@testing-library/react'
import ProjectLink from '../ProjectLink'

it('renders correctly', () => {
  const { container } = render(
    <ProjectLink
      href="https://example.com"
      title="Example"
      imageSrc="https://via.placeholder.com/150"
    />
  )
  expect(container).toMatchSnapshot()
})