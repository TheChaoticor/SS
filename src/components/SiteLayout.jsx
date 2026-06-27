import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import { useAuth } from "./AuthContext";

export default function SiteLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    showLogin,
    closeLogin,
    login,
    redirectPath,
  } = useAuth();

  return (
    <>
      <Navbar />

      <main
        className={
          location.pathname === "/"
            ? ""
            : "pt-32"
        }
      >
        {children}
      </main>

      <Footer />
      {showLogin && (
  <Login
    onClose={closeLogin}
    onSuccess={() => {
      login();

      if (redirectPath) {
        navigate(redirectPath);
      }
    }}
  />
)}
    </>
  );
}
