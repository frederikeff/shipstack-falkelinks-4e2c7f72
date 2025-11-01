import { render, screen } from '@testing-library/react';
import ContactButton from '../ContactButton';

describe('ContactButton', () => {
  it('renders a link with the correct href and text', () => {
    render(<ContactButton />);

    const link = screen.getByRole('link', { name: /Email Me/i });
    expect(link).toHaveAttribute('href', 'mailto:hi@creativeailab.ai');
  });
});
