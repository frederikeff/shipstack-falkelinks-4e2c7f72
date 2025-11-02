describe('gtag', () => {
  const mockGtag = jest.fn();

  beforeEach(() => {
    // Reset modules to ensure we get a fresh import of gtag with the mocked window
    jest.resetModules();

    // Add the mock gtag function to the jsdom window object
    (window as any).gtag = mockGtag;

    // Clear mock history before each test
    mockGtag.mockClear();
  });

  describe('event', () => {
    it('should call window.gtag with the correct parameters when it exists', () => {
      // Require the module inside the test, after the mock is set up
      const { event } = require('../gtag');
      const eventData = {
        action: 'click',
        category: 'Test Category',
        label: 'Test Label',
        value: 123,
      };

      event(eventData);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalledWith('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
      });
    });

    it('should not throw or call gtag if window.gtag does not exist', () => {
      // For this test, simulate the gtag script not loading
      delete (window as any).gtag;

      // Require a fresh version of the module where window.gtag is undefined
      const { event } = require('../gtag');
      const eventData = {
        action: 'click',
        category: 'Test Category',
        label: 'Test Label',
        value: 123,
      };

      // We expect this to run without error and not call our mock
      event(eventData);
      expect(mockGtag).not.toHaveBeenCalled();
    });
  });
});
