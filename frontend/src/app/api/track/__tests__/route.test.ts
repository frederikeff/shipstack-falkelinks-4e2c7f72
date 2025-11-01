/**
 * @jest-environment node
 */
import { POST } from "../route";
import { NextRequest } from "next/server";

describe("/api/track", () => {
  it("should return a 200 OK response with a valid request body", async () => {
    const eventName = "Test Event";
    const data = { foo: "bar" };

    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({ eventName, data }),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ success: true });
  });

  it("should return a 500 Internal Server Error with an invalid request body", async () => {
    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: "invalid json",
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body).toEqual({
      success: false,
      message: "Internal Server Error",
    });
  });
});
