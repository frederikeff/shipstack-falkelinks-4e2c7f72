import { trackClick } from '../analytics';

describe('trackClick', () => {
  it('should log the event and data to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    trackClick('test_event', { foo: 'bar' });
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event: test_event', { foo: 'bar' });
    consoleSpy.mockRestore();
  });
});
