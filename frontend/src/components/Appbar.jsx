
import { useNavigate } from "react-router-dom";

export const Appbar = ({ lastName,userId,username,firstname, firstlater,balance }) => {
    const navigate=useNavigate();
  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
 <div className="text-lg font-semibold">PayTM App</div>
  <div className="flex items-center gap-4">
    <div className="text-base">{firstname}</div>
<button onClick={()=>{navigate("/profile",{
  state:{firstname:firstname,userId:userId,lastName:lastName,username:username,balance:balance}
});

}} className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-xl"> {firstlater}
 </button>
        <button 
        onClick={()=>{ 
             localStorage.removeItem("token");
            navigate("/signin");
        }}
        className="text-sm rounded hover:bg-slate-600  bg-black p-2 text-white">Logout</button>
      </div>
    </div>
  );
};
