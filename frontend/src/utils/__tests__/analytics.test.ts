import { trackClick } from '../analytics';

describe('trackClick', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log the event and data to the console', () => {
    const event = 'Test Event';
    const data = { foo: 'bar' };

    trackClick(event, data);

    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics Event]: ${event}`, data);
  });

  it('should log the event to the console when no data is provided', () => {
    const event = 'Test Event without data';

    trackClick(event);

    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics Event]: ${event}`, {});
  });
});
