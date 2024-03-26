import { customFetch } from "../components/request/util";
export const isAuthenticated = async function (auth, navigate,updateAuth) {
  if (auth === null || auth === undefined || auth == '' || Object.keys(auth).length == 0) {
     let user = await window.cookieStore.get('PRIME-SYSTEMS-LAB-DOCTOR');
     if (user == null || user == undefined || user == '' || Object.keys(user).length == 0) {
        if (window.location.href !== '/signin') {
           navigate.push('/signin')
        }
     } else {
        const token = user?.value;
        const authentic = await customFetch(`authenticate/employee/token?token=${token}`);
        const { statusCode, status, message } = authentic;
        if (statusCode == 200 && status == 'success') {
           const { username, role, email, employeeid } = authentic?.user;
          updateAuth({ username, role, email, employeeid });
        }

        if (statusCode == 404 && status == 'error' && message == 'Expired token') {
           navigate.push('/signin')
        }
     }
  }
}

