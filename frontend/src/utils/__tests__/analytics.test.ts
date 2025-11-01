import { track } from '../analytics';

describe('analytics', () => {
  it('logs events to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    track('Test Event', { foo: 'bar' });

    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Event: Test Event', { foo: 'bar' });

    consoleSpy.mockRestore();
  });
});
