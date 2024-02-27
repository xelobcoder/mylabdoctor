"use client"
import { useRouter } from "next/navigation";
import { customPost } from "@/components/request/util";
import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext, AuthenticationContext } from "@/components/AuthenticationContext";
export default function LoginPage() {
  const { auth, updateAuth } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' })

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const pushResponse = await customPost('login/clinicians', data);
    const { status, statusCode, message, token, result } = pushResponse;
    console.log(pushResponse);
    if (status == 'success' && statusCode == 200 && result && token) {
      if (result?.role === 'clinician') {
        cookieStore.set({
          name: 'PRIME-SYSTEMS-LAB-DOCTOR',
          value: token,
          path: '/',
          domain: 'localhost',
          secure: true,
          sameSite: 'strict',
          expires: new Date(Date.now() + 60 * 60 * 1000),
        });
        toast.success('Login successful', { autoClose: 3000 });
        updateAuth(result);
        setLoading(true);
        router.push('/dashboard');
        return;
      }
      setData({ email: '', password: '' });
      toast.error('You are not a clinician', { autoClose: 3000 });
    } else {
      toast.error(message, { autoClose: 3000 });
    }
  }


  return (
    <section>
      <ToastContainer />
      {!loading && (
        <div style={{
          display: 'flex', justifyContent: 'center', paddingTop: "200px", backgroundColor: 'wheat', width: '100%',
          height: '100vh'
        }}>
          <form style={{ width: 'max-content', height: 'max-content' }} className="bg-white p-4" >
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input className="custom-input" type="email" value={data.email} onChange={(ev) => setData({ ...data, email: ev.target.value })} id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" className="custom-input" value={data.password} onChange={(ev) => setData({ ...data, password: ev.target.value })} id="password" name="password" />
              <button type="button" className="btn-success btn-sm btn mt-2" onClick={(ev) => { handleSubmit(ev) }}> Login</button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}


LoginPage.getLayout = function (page) {
  return (
    <AuthenticationContext>
      {page}
   </AuthenticationContext>
  )
}