
import { render, screen, fireEvent } from '@testing-library/react';
import LabGridItem from '@/components/LabGridItem';
import fetchMock from 'jest-fetch-mock';

describe('LabGridItem', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should send a tracking request on click', () => {
        const lab = {
            href: 'https://example.com',
            title: 'Test Lab',
        };

        render(<LabGridItem {...lab} />);
        fireEvent.click(screen.getByText('Test Lab'));

        expect(fetchMock).toHaveBeenCalledWith('/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: 'https://example.com' }),
        });
    });
});
