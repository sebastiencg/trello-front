import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {

  const storedData:string|null = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (storedData){
      localStorage.removeItem('token')
      navigate("/login");
    }
    }, [navigate, storedData]);
  return (
    <></>

  );
};

export default Logout;

