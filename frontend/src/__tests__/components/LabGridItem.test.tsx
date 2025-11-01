import { render, screen, fireEvent } from "@testing-library/react";
import LabGridItem from "@/components/LabGridItem";
import fetchMock from "jest-fetch-mock";

describe("LabGridItem", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should send a POST request to /api/track on click", () => {
    const lab = {
      href: "https://example.com",
      title: "Example Lab",
    };

    render(<LabGridItem {...lab} />);

    fireEvent.click(screen.getByText("Example Lab"));

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual("/api/track");
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "labGridItemClick",
        title: lab.title,
        href: lab.href,
      }),
    });
  });
});
