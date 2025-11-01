/**
 * @jest-environment node
 */

import { POST } from "../route";
import { NextRequest } from "next/server";
import fs from "fs/promises";

jest.mock("fs/promises", () => ({
  appendFile: jest.fn(),
}));

jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  NextResponse: {
    json: jest.fn((body, init) => ({
      ...init,
      json: () => Promise.resolve(body),
    })),
  },
}));

describe("POST /api/track", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should track an event and return a 200 response", async () => {
    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ event: "Test Event", foo: "bar" }),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(fs.appendFile).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('{"foo":"bar"}'),
    );
  });

  it("should return a 400 response if the event name is missing", async () => {
    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
  });

  it("should return a 500 response on an internal server error", async () => {
    (fs.appendFile as jest.Mock).mockRejectedValueOnce(new Error("Test Error"));

    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ event: "Test Event", foo: "bar" }),
    });

    const response = await POST(req);

    expect(response.status).toBe(500);
  });
});
