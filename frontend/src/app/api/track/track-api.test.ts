/**
 * @jest-environment node
 */
import { POST } from "@/app/api/track/route";
import { NextResponse } from "next/server";

describe("Analytics API", () => {
  it("should log the event data and return a success message", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const request = new Request("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ eventName: "Test Event", data: "test data" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(consoleSpy).toHaveBeenCalledWith("Analytics event:", {
      eventName: "Test Event",
      data: "test data",
    });
    expect(body).toEqual({ message: "Event tracked" });

    consoleSpy.mockRestore();
  });
});
