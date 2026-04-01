import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const Home = ()=>{
const { login, user } = useAuth();
 const navigate = useNavigate();

   useEffect(() => {
     if (user) {
       if (user.role === "admin") navigate("/admin");
 else if (user.role === "editor") navigate("/editor");
 else navigate("/library");
     }else{
        navigate("/login");
     }
   }, [user, navigate]);

    return <></>
}