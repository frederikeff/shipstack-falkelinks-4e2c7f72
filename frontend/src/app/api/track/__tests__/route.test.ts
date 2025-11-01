/**
 * @jest-environment node
 */

import { POST } from "../route";
import { NextRequest } from "next/server";

describe("POST /api/track", () => {
  it("returns a 200 response with a success message", async () => {
    const req = new NextRequest("http://localhost/api/track", {
      method: "POST",
      body: JSON.stringify({
        href: "https://example.com",
        title: "Example",
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ message: "Event tracked" });
  });
});
