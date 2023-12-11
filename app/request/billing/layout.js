export const metadata = {
  title: 'Clinician new request',
  description: 'Built by Leonides as part of prime lab systems',
}

import "../../../styles/globals.css";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";


export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
