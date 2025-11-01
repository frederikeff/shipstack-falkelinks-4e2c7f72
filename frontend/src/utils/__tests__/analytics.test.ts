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

    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics] Event: ${event}`, data);
  });
});
