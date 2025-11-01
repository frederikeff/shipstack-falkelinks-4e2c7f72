
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectLink from '@/components/ProjectLink';
import fetchMock from 'jest-fetch-mock';

describe('ProjectLink', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should send a tracking request on click', () => {
        const project = {
            href: 'https://example.com',
            title: 'Test Project',
            imageSrc: 'https://via.placeholder.com/150',
        };

        render(<ProjectLink {...project} />);
        fireEvent.click(screen.getByText('Test Project'));

        expect(fetchMock).toHaveBeenCalledWith('/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: 'https://example.com' }),
        });
    });
});
