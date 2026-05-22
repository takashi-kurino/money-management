// app/api/auth/registration/route.ts

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  
  const body = await req.json()
  
  const Res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/registration/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const contentType = Res.headers.get("Content-Type") ?? ""
  const data = contentType.includes("application/json") ? await Res.json() : null

  if (!Res.ok) {
    return NextResponse.json(data, { status: Res.status })
  }
  return NextResponse.json({ ok: true })
}