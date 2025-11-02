import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LabGridItem from '../LabGridItem'
import * as gtag from '@/lib/gtag'

jest.mock('@/lib/gtag')

describe('LabGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the lab grid item', () => {
    render(<LabGridItem href="/lab" title="Example Lab" />)
    expect(screen.getByRole('link', { name: 'Example Lab' })).toBeInTheDocument()
  })

  it('calls the gtag event function on click', async () => {
    render(<LabGridItem href="/lab" title="Example Lab" />)
    await userEvent.click(screen.getByRole('link'))
    expect(gtag.event).toHaveBeenCalledWith({
      action: 'click',
      category: 'Lab Grid Item',
      label: 'Example Lab',
      value: 1,
    })
  })
})
