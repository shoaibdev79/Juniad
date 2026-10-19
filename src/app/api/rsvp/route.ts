import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 5000) return NextResponse.json({ error: "Response too large" }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "Invalid response" }, { status: 400 }); }
    if (!body || typeof body.name !== "string" || !body.name.trim() || body.name.length > 150 || !["yes", "no"].includes(body.attendance) || (body.dietary != null && (typeof body.dietary !== "string" || body.dietary.length > 1000))) {
      return NextResponse.json({ error: "Please enter your name and attendance." }, { status: 400 });
    }
    const directory = path.join(process.cwd(), ".data");
    await mkdir(directory, { recursive: true });
    await appendFile(path.join(directory, "rsvps.ndjson"), JSON.stringify({ name: body.name.trim(), attendance: body.attendance, dietary: (body.dietary ?? "").trim(), receivedAt: new Date().toISOString() }) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save response. Please try again." }, { status: 500 });
  }
}
