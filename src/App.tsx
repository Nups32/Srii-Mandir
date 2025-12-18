import { useEffect, useState, type PropsWithChildren } from 'react'
import './App.css'
import { ArrowUp } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
// import { getPublicIP } from './utils/API';

function App({ children }: PropsWithChildren) {
    const [showButton, setShowButton] = useState(false);


useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowButton(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
      <ScrollToTop />
      {/* Scroll to top button */}
        {showButton && (
          <button
            className="fixed bottom-6 right-6 z-50 border flex items-center justify-center w-12 h-12 rounded-full border-white bg-orange-300 shadow-lg transition hover:bg-yellow-500 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="text-white w-6 h-6" />
          </button>
        )}
    </>
  )
}

export default App;