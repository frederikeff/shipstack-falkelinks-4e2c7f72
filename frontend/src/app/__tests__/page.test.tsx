import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the Image component to prevent errors in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('Home page', () => {
  it('renders the lab grid with all five lab items', () => {
    render(<Home />)

    const labTitles = [
      'Builder Lab',
      'Character Lab',
      'Research Lab',
      'Mind Lab',
      'Creator Lab',
    ]

    labTitles.forEach((title) => {
      expect(screen.getByRole('link', { name: title })).toBeInTheDocument()
    })
  })
})
