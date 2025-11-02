import { render, screen } from '@testing-library/react'
import LabGridItem from '@/components/LabGridItem'

describe('LabGridItem', () => {
  it('renders a link with the correct title and href', () => {
    const title = 'Test Lab'
    const href = '/test-lab'
    render(<LabGridItem title={title} href={href} />)

    const link = screen.getByRole('link', { name: title })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', href)
  })
})
