/**
 * @jest-environment node
 */

import { POST } from "@/app/api/track/route";
import { NextRequest } from "next/server";
import { Readable } from "stream";

// Mock NextRequest
function createMockRequest(body: any): NextRequest {
  const jsonString = JSON.stringify(body);
  const stream = new Readable();
  stream.push(jsonString);
  stream.push(null); // end of stream

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return new NextRequest("https://localhost/api/track", {
    method: "POST",
    headers,
    body: stream as any,
  });
}

describe("/api/track", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should track a click and return a 200 response", async () => {
    const url = "https://example.com";
    const req = createMockRequest({ url });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.message).toBe(`Click tracked for: ${url}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`[Analytics] Click tracked for: ${url}`);
  });

  it("should return a 400 response if URL is not provided", async () => {
    const req = createMockRequest({});

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.message).toBe("URL is required");
  });

  it("should return a 500 response if there is a server error", async () => {
    // Simulate an error by providing an invalid request body
    const req = new NextRequest("https://localhost/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: new ReadableStream({
            start(controller) {
                controller.error(new Error("Test error"));
            }
        })
    });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.message).toBe("Error tracking click");
  });
});
