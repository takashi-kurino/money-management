// app/api/auth/verify-email/route.ts

import { NextRequest, NextResponse } from "next/server"
import {cookies} from 'next/headers'

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;
    
    const body = await req.json()
    
    const Res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/auth/password/change/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(body),
    })
    const data = await Res.json()

  if (!Res.ok) {
    return NextResponse.json(data, { status: Res.status })
  }

  const response = NextResponse.json({ ok: true })
  
  return response
}