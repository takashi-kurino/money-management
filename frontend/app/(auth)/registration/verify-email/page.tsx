'use client'

// import {VerifyEmail}  from "@/app/(auth)/components/VerifyEmail"
import { useSearchParams } from "next/navigation"
import { VerifyEmail } from "@/app/(auth)/clientactions"
import { useState ,useEffect} from "react";

type VerifyEmailResult = {
    detail?: string;
}

export default function Page() {
    const searchParams = useSearchParams();
    let verify_key = searchParams.get("key") || "";
    const [state, setState] = useState<string | "">("");

    useEffect(() => {
        async function verify() {
            const result = await VerifyEmail(verify_key);
            const data = result.data as VerifyEmailResult;

            if (result) {
                setState(data.detail || "");
            }
        }
        if (verify_key) {
            verify();
        }
    }, [verify_key]);

    return (
        <div className=" h-screen w-full flex justify-center items-center">
            <div className="w-full max-w-sm">
                verify email
                {state && (
                    <p>{state}</p>
                )}
            </div>
        </div>
    )
}
