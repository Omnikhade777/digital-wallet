import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const [username1,setusername1]=useState("");
  const [password,setpassword]=useState("");
  const [state,setstate]=useState(false);
  const navigate=useNavigate();
  const handelsumbit=async()=>{
   setstate(true);
 const response= await axios.post("http://localhost:3000/app/v1/user/signin",{
 username:username1,
 password 
});
 const {token,userId,firstName2,fullname,username}=response.data;
localStorage.setItem("token", token);

setstate(false);
navigate("/dashboard", {
state: { userId: userId, firstName: firstName2,lastname:fullname,username:username }
});


  }

  
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
          setusername1(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setpassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button
          onClick={handelsumbit}
           label={state ? "processing...":"Sign in"} />
           <Button onClick={()=>{navigate("/updateinfo")}} label={"Update credentials"}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}