'use client'
// BFFのため、クライアントで動作する。実行ファイルは@/app/api/auth/*/route.ts

export async function Login(prevState:any,formData:FormData) {
    const username = formData.get("username")
    const password = formData.get("password")
    
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {username,password} ),
        credentials: "include",
    });
    if(!res.ok){
        return{message:"ユーザー名またはパスワードが違います。",redirectTo:""}
        
    }
    if(res.ok){
        return{message:"",redirectTo:"/transaction"}
    }
}

export async function Logout(){
    const res = await fetch("api/auth/logout",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",

    });
    if(!res.ok){
        return {message:"ログアウトに失敗しました。",redirectTo:""}
        
    }
    if(res.ok){
        return{message:"ログアウト成功",redirectTo:"/login"}
    }

}