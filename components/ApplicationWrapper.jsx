import { useContext, useEffect,useRef } from "react"
import Navbar from "./Navbar"
import { AuthContext } from "./AuthenticationContext"
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/util";
export default function ApplicationWrapper({ children }) {
  const { auth, updateAuth } = useContext(AuthContext);
  const router = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      isAuthenticated(auth, router, updateAuth);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div ref={pageRef} className="wrapper">
      <div className='side bg-dark'>
        <Navbar />
      </div>
      <main className="main">{children}</main>
    </div>
  )
}
