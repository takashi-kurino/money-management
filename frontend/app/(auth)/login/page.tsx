

import { LoginForm } from "@/app/(auth)/components/LoginForm"

export default function Page() {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
