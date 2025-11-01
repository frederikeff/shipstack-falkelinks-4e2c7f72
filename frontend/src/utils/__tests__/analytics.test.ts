
import { trackClick } from '../analytics';

describe('trackClick', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log the event name and data to the console', () => {
    const eventName = 'Test Event';
    const data = { foo: 'bar' };

    trackClick(eventName, data);

    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics] Event: ${eventName}`, data);
  });

  it('should log only the event name when no data is provided', () => {
    const eventName = 'Test Event';

    trackClick(eventName);

    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics] Event: ${eventName}`, undefined);
  });
});
