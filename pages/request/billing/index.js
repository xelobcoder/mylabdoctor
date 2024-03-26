import { useCallback, useContext, useEffect, useState } from "react";
import { getTestList } from "../../../lib/billingUtil";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { customPost } from "../../../components/request/util";
import { AuthContext } from "../../../components/AuthenticationContext";
import Autocomplete from '@mui/joy/Autocomplete';
import { internationCurrencyFormat } from "../../../components/accessories/useFetch";


export default function Billing() {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [store, setTestList] = useState([]);
  const [selected, setSelected] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCart, setViewCart] = useState(false);
  const employeeid = auth?.employeeid;
  const patientid = useSearchParams().get('patientid');



  const getData = useCallback(async () => {
    await getTestList(setData, setLoading, setTestList);
  }, [])




  const addtocart = async (item) => {
    // check if item is already in cart
    if (!item.hasOwnProperty("id") || typeof item != 'object') {
      throw new Error('object required');
    }
    if (cart.length == 0) { setCart([item]); }

    if (cart.length > 0) {
      const exist = cart.filter((i) => { return i.id == item.id });
      if (exist.length == 0) { setCart([...cart, item]); toast.success(`${item?.name} added to cart`, { autoClose: 500 }); return; }
      toast.warning(`${item.name} already in cart`, { autoClose: 500 });
    }
  }






  useEffect(() => { getData(); }, [getData])


  const handleCart = (e) => {
    e.preventDefault();
    setViewCart(!viewCart);
  }


  const handleCheckout = async function () {
    // checkout the cart
    const checkout = cart.map((item) => {
      return { id: item.id, name: item.name, price: item.price }
    });
    if (employeeid && checkout.length > 0) {
      setLoading(true);
      const pushRequest = await customPost('orders/temporary', { clinicianid: employeeid, data: checkout ,patientid});
      const { status, statusCode, message } = pushRequest;
      if (status == 'success' && statusCode == 200) {
        toast.success(message, { autoClose: 2000 });
        setCart([]);
        setViewCart(false);
        setLoading(false);
        return;
      } else {
        toast.error(message, { autoClose: 2000 });
        setLoading(false);
        return;
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex">
        <Autocomplete
          className='custom-input col-8'
          options={data}
          onChange={(ev, newValue) => {
            setSelected(newValue);
          }}
          getOptionLabel={(option) => option.name} />
        <button onClick={(ev) => { addtocart(selected) }} className='btn btn-primary btn-sm mx-2'>
          add to cart
        </button>
      </div>
      <div>
          {cart.length > 0 && <div className="cart-wrapper mt-3">
            <div className="cart-header d-flex justify-content-between">
              <span>Test</span>
              <span>Price</span>
            </div>
            <div className="bg-white list-group">
              {cart.map((item, index) => {
                return (
                  <div key={index} className="cart-item d-flex justify-content-between list-group-item">
                    <span> {item.name}</span>
                    <span> {internationCurrencyFormat(item.price)}</span>
                  </div>
                )
              })}
            </div>
            <button onClick={handleCheckout} className="btn-success btn-sm btn my-3">Checkout</button>
          </div>}
      </div>
    </>
  )
}