'use client'

import { json } from "node:stream/consumers";

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
        const data = await res.json();
        return{data:data,redirectTo:""}
    }
    if(res.ok){
        return{data:null,redirectTo:"/transaction"}
    }
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
        credentials: "include",
    });
    const data = await res.json();
    if(!res.ok){
        return{data:data,success_flag:false}
    }
    if(res.ok){
        return{data:data,success_flag:true}
    }
}

export async function VerifyEmail(key:string){ 

    const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {key} ),
        credentials: "include",
    });

    const data = await res.json();

    return{data:data}
        
}

export async function DeleteAccount(prevState:any,formData:FormData){
    const password = formData.get("password")
    console.log("DeleteAccount called with password:", password);
    
    const res = await fetch("/api/auth/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {password} ),
        credentials: "include",
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
        credentials: "include",

    });
    if(!res.ok){
        return {message:"ログアウトに失敗しました。",redirectTo:""}
        
    }
    if(res.ok){
        return{message:"ログアウト成功",redirectTo:"/login"}
    }

}