import { useEffect, useState, type PropsWithChildren } from "react";
import "./App.css";
import { ArrowUp } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import type { IRootState } from "./store";
import { useNavigate } from "react-router-dom";
import { setUserClearConfig } from "./store/userConfigSlice";
// import { getPublicIP } from './utils/API';

function App({ children }: PropsWithChildren) {
  const [showButton, setShowButton] = useState(false);
  const authData = useSelector((state: IRootState) => state.userConfig);
  const token = authData.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowButton(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin/');
  // const navigate = useNavigate();
  // const TRUSTED_IPS = ['150.129.104.117', '152.59.22.140'];

  useEffect(() => {
    if (!token && isAdminRoute) {
      navigate('/login')
    }
    if (location.pathname === "/logout") {
      localStorage.clear()
      dispatch(setUserClearConfig());
      navigate('/login')
      return
    }
  }, []);

  useEffect(() => {
    // if (token && (location.pathname === '/' || location.pathname === '/register' || location.pathname === '/admin-login' || location.pathname === '/forget-password')) {
    //   navigate('/dashboard');
    // } else 
    if (!token && (location.pathname == '/profile' || location.pathname == '/puja/history' || location.pathname == '/chadhava/history')) {
      navigate('/');
    }
  }, [location.pathname]);

  return (
    <>
      {children}
      <ScrollToTop />
      {/* Scroll to top button */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
           bg-orange-600 hover:bg-orange-500
           border border-white/70
           shadow-lg hover:shadow-orange-400/50
           flex items-center justify-center
           transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
}

export default App;
