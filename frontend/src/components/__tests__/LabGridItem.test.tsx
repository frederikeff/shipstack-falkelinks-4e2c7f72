import { render, screen } from '@testing-library/react'
import LabGridItem from '../LabGridItem'

describe('LabGridItem', () => {
  it('renders a lab grid item with the correct href and title', () => {
    const lab = {
      href: '/test-lab',
      title: 'Test Lab',
    }
    render(<LabGridItem {...lab} />)

    const linkElement = screen.getByRole('link', { name: lab.title })
    expect(linkElement).toHaveAttribute('href', lab.href)
    expect(linkElement).toHaveTextContent(lab.title)
  })
})