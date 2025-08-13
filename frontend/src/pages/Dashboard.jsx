import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
  const [balance, setBalance] = useState("");  
   const location = useLocation();
  const name = location.state?.firstName;
  const id=location.state?.userId;
  const lastname=location.state?.lastname;
  console.log(lastname);
  const username=location.state?.username;
  useEffect(() => {
    const fetchBalance = async () => {
     
        const { data } = await axios.get(
          "http://localhost:3000/app/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const formatted = data.balance.toLocaleString("en-IN"); 
        setBalance(formatted);
   
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col h-screen">
        <div className="h-14 shadow z-10 bg-white">
      <Appbar balance={balance} lastname={lastname} userId={id} username={username} firstname={name.toUpperCase()} firstlater={name[0].toLocaleUpperCase()}/>
        </div>
      <div className="m-8">
          <div className="h-16 z-10 bg-gray-100 border-b px-4 flex items-center">
 <Balance value={balance} />
  </div>
         <div className="flex-1 overflow-y-auto bg-gray-50 px-4">
     <Users />
  </div>
      
      </div>
    </div>
  );
};
