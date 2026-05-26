'use client'

export async function Login(username: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const data = await res.json()
    return { ok: false, data }
  }

  return { ok: true }
}

export async function Registration(prevState:any,formData:FormData) {
    const username = formData.get("username")
    const email = formData.get("email") 
    const password1 = formData.get("password1")
    const password2 = formData.get("password2")

    const res = await fetch("/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {username,email,password1,password2} ),
    });
    
    const contentType = res.headers.get("Content-Type") ?? ""
    const data = contentType.includes("application/json") ? await res.json() : null
    console.log("Registration response:", { status: res.status, data })

    if(!res.ok){
        return{data:data,success_flag:false,email:email}
    }
    if(res.ok){
        return{data:data,success_flag:true,email:email}
    }
}

export async function ResendEmail(email:string){

    const res = await fetch("/api/auth/registration/resend-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {email} ),
    });

    if (!res.ok) {
        // エラー時だけ json を読む（エラーレスポンスにはボディがあるはず）
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.detail ?? `Request failed: ${res.status}`);
    }

    // 成功時：ボディがある場合だけ json をパース
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return await res.json();
    }

    return null; // 204 など空レスポンスの場合
        
}

export async function VerifyEmail(key:string){ 

    const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {key} ),
    });

    const data = await res.json();

    return{data:data,status:res.status}
        
}

export async function PasswordReset(prevState:any,formData:FormData){
    const email = formData.get("email")

    const res = await fetch("/api/auth/passwordreset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {email} ),
    });

    const data = await res.json();
    if(!res.ok){
        return{data:data,success:false}
    }

    return{data:data,success:true}
}

export async function PasswordResetConfirm(prevState:any,formData:FormData){
    const new_password1 = formData.get("new_password1")
    const new_password2 = formData.get("new_password2")
    const uid = formData.get("uid")
    const token = formData.get("token")

    const res = await fetch("/api/auth/passwordreset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {new_password1,new_password2,uid,token} ),
        
    });

    const data = await res.json();
    if(!res.ok){
        return{data:data,success:false}
    }

    return{data:data,success:true}
}

export async function PasswordChange(prevState:any,formData:FormData){
    const new_password1 = formData.get("new_password1")
    const new_password2 = formData.get("new_password2")

    const res = await fetch("/api/auth/passwordchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {new_password1,new_password2} ),
        
    });

    const data = await res.json();
    if(!res.ok){
        return{data:data,success:false}
    }

    return{data:data,success:true}
}

export async function DeleteAccount(prevState:any,formData:FormData){
    const password = formData.get("password")
    
    const res = await fetch("/api/auth/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {password} ),
        
    });

    if(!res.ok){
        const data = await res.json();
        return{data:data,success:false}
    }
    if(res.ok){
        return{data:null,success:true}
    }
}
export async function Logout(){
    
    const res = await fetch("/api/auth/logout",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    
    if(!res.ok){
        return {message:"ログアウトに失敗しました。"}
    }
    if(res.ok){
        return res.ok
    }

}