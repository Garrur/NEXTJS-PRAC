"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")

  const router = useRouter();

  const hadleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(password !== confirmpassword){
        setError("Password does not match")
    }
    try{
     const res= await fetch("/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
     })

     const data = res.json()
     if(!res.ok){
        setError("Registration Failed")
     }

     router.push("/login")
    }catch(error){
        setError("unable to fetch")
    }
    
  }

  return <div>Register</div>;
}

export default Register;
