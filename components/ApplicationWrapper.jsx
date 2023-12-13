import { useContext, useEffect,useRef } from "react"
import Navbar from "./Navbar"
import { AuthContext } from "./AuthenticationContext"
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/util";
export default function ApplicationWrapper({ children }) {
  const { auth, updateAuth } = useContext(AuthContext);
  const router = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      isAuthenticated(auth, router, updateAuth);
    }
  }, [])

  console.log(auth);
  return (
    <div ref={pageRef} className="app-divider">
      <Navbar />
      <main className="main-wrapper">{children}</main>
    </div>
  )
}
