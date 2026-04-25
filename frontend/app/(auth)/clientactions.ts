'use client'

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
        return{message:"成功",redirectTo:"/transaction"}
    }
}

export async function Logout(){

}