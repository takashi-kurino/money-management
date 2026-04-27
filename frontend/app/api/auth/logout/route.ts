// app/api/auth/login/route.ts

"use server"

import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  
  const Res = await fetch(`${process.env.DJANGO_INTERNAL_URL}api/auth/logout/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  const data = await Res.json()
  if (!Res.ok) {
    return NextResponse.json(data, { status: Res.status })
  }

  // クッキーを削除するためのレスポンスを返す
  const response = NextResponse.json({ ok: true })
  response.cookies.delete("access")
  response.cookies.delete("refresh")
  response.cookies.delete("sessionid")
  response.cookies.delete("csrftoken")
  
  return response
}