/**
 * @jest-environment node
 */

import { POST } from "@/app/api/track/route";
import { NextRequest } from "next/server";

jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  NextResponse: {
    json: jest.fn((body, init) => ({
      json: () => Promise.resolve(body),
      status: init?.status || 200,
    })),
  },
}));

describe("/api/track", () => {
  it("should log the request body and return a 200 response", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ event: "test" }),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(logSpy).toHaveBeenCalledWith("Analytics event:", { event: "test" });

    logSpy.mockRestore();
  });
});
