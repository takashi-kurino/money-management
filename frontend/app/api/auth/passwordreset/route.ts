// app/api/auth/passwordreset/route.ts

"use server"

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  
  const body = await req.json()
  const Res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/password/reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await Res.json()

  if (!Res.ok) {
    return NextResponse.json(data, { status: Res.status })

  }

  const response = NextResponse.json({ ok: true })

  return response

}