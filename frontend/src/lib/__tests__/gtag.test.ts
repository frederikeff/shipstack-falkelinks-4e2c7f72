import { pageview, event } from '../gtag';

describe('gtag', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('pageview', () => {
    it('should call window.gtag with the correct parameters', () => {
      const url = new URL('https://example.com');
      pageview(url);
      expect(window.gtag).toHaveBeenCalledWith('config', expect.any(String), {
        page_path: url,
      });
    });
  });

  describe('event', () => {
    it('should call window.gtag with the correct parameters', () => {
      const action = 'click';
      const category = 'Project Link';
      const label = 'Nxtconnect';
      const value = 1;
      event({ action, category, label, value });
      expect(window.gtag).toHaveBeenCalledWith('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    });
  });
});
