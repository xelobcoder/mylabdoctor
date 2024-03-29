import Divider from "../components/Divider";
import "../styles/globals.css";
import '../node_modules/react-toastify/dist/ReactToastify.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <Divider>
      <Component {...pageProps} />
    </Divider>
  )
}
