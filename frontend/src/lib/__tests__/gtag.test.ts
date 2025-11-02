describe('gtag', () => {
  const GA_TRACKING_ID = 'test-id';

  beforeEach(() => {
    jest.resetModules();
    process.env.NEXT_PUBLIC_GA_ID = GA_TRACKING_ID;
    window.gtag = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_GA_ID;
  });

  it('should call gtag with pageview', () => {
    const gtag = require('@/lib/gtag');
    const url = new URL('https://example.com');
    gtag.pageview(url);
    expect(window.gtag).toHaveBeenCalledWith('config', GA_TRACKING_ID, {
      page_path: url,
    });
  });

  it('should call gtag with event', () => {
    const gtag = require('@/lib/gtag');
    const event = {
      action: 'click',
      category: 'Test',
      label: 'Test Label',
      value: 1,
    };
    gtag.event(event);
    expect(window.gtag).toHaveBeenCalledWith('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  });

  it('should not call gtag if GA_TRACKING_ID is not defined', () => {
    delete process.env.NEXT_PUBLIC_GA_ID;
    const gtag = require('@/lib/gtag');
    const url = new URL('https://example.com');
    gtag.pageview(url);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
