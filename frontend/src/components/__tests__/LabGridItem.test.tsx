import { render, screen } from '@testing-library/react'
import LabGridItem from '../LabGridItem'

it('renders correctly', () => {
  const { container } = render(
    <LabGridItem href="https://example.com" title="Example" />
  )
  expect(container).toMatchSnapshot()
})