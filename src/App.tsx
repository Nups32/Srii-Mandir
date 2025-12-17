import { useContext, useEffect, type PropsWithChildren } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
// import { getPublicIP } from './utils/API';
import { message } from 'antd';

function App({ children }: PropsWithChildren) {


  // const token = authData.token;
  // const isAdminRoute = location.pathname.startsWith('/admin/');
  // const navigate = useNavigate();
  // const TRUSTED_IPS = ['150.129.104.117', '152.59.22.140'];


  // useEffect(() => {

  //   if (!token && isAdminRoute) {

  //     navigate('/admin-login')
  //   }
  //   if (location.pathname === "/logout") {
  //     // localStorage.removeItem("token");
  //     localStorage.clear()
  //     navigate('/admin-login')
  //     return
  //   }
  // }, []);
  
  return (
    <>
      {children}
    </>
  )
}

export default App;