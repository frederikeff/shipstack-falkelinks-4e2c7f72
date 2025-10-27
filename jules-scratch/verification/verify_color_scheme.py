from playwright.sync_api import sync_playwright, Page, expect
import os

def run(playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    try:
        # 1. Arrange: Go to the application's homepage.
        page.goto("http://localhost:8000")
        page.wait_for_load_state("networkidle")

        # 2. Assert: Check the background color of the body.
        body = page.locator("body")
        expect(body).to_have_css("background-color", "rgb(245, 158, 11)")

        # 3. Screenshot: Capture the final result for visual verification.
        screenshot_path = os.path.abspath("verification.png")
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)