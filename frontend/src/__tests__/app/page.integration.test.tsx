import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '@/app/page';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Home page click tracking', () => {

    beforeEach(() => {
        fetchMock.resetMocks();
    });

  it('should track clicks on ProjectLink components', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Click tracked' }));
    render(<Home />);

    const projectLink = screen.getByText('Nxtconnect');

    await act(async () => {
        fireEvent.click(projectLink);
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.nxtconnect.ai' }),
    });
  });

  it('should track clicks on LabGridItem components', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Click tracked' }));

    render(<Home />);

    const labGridItem = screen.getByText('Builder Lab');

    await act(async () => {
        fireEvent.click(labGridItem);
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.creativeailab.ai/builder-lab' }),
    });
  });
});
