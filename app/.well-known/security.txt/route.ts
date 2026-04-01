import { NextResponse } from "next/server";

const SECURITY_TXT = [
  "Contact: mailto:mike@mikeyerke.com",
  "Canonical: https://www.mikeyerke.com/.well-known/security.txt",
  "Policy: https://www.mikeyerke.com/trust",
  "Preferred-Languages: en",
  "Expires: 2027-04-01T00:00:00.000Z"
].join("\n");

export function GET() {
  return new NextResponse(`${SECURITY_TXT}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}
