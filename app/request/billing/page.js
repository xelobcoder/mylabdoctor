"use client";
import Divider from "@/components/Divider";
import { useCallback, useEffect, useState } from "react";
import { getTestList } from "./util";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";


export default function Billing() {
  const [data, setData] = useState([]);
  const [store, setStore] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCart, setViewCart] = useState(false);
  const urlparams = useSearchParams();
  const [hightlighted, setHightlighted] = useState(0);
  const patientid = urlparams.get('patientid');

  const getData = useCallback(async () => {
    await getTestList(setData, setLoading, setStore);
  }, [])


  const internationCurrencyFormat = (num) => {
    const c = new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(num);
    return c;
  }


  const handleSearch = async (e) => {
    setSearch(e.target.value);
    let getStore = [...store];
    let q = e.target.value;
    if (q.length >= 3 && getStore.length > 0) {
      const filtered = getStore.filter((item) => {
        return item.name.toLowerCase().includes(q.toLowerCase());
      });
      setData(filtered);
    } else {
      setData(getStore);
    }
  }

  const handleKeyDown = (e) => {
    // down key should mpve to the next item in the list
    // up key should move to the previous item in the list
    // enter key should add the item to the cart
    // esc key should clear the search input

    if (e.keyCode === 9) {
      // move to the next item in the list
      if (data.length > 0 && hightlighted < data.length) {
        e.preventDefault();
        setHightlighted(1);
        // loss focus on the input
        e.target.blur();
      }
    }
  }


  useEffect(() => {
    // if esc is pressed , make search input focus and clear the search input
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setSearch('');
          searchInput.focus();
          setHightlighted(0);
        }
      });
    }
  }, [])


  useEffect(() => {
    const highlightedItem = document.querySelector('.highlighted-item');
    if (highlightedItem) {
      highlightedItem.focus();
      highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [hightlighted])

  const listClicked = (index, item) => { 
    setSearch(item.name);
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`,{autoClose: 500});
    setSearch('');
   }


  const listKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.keyCode === 9) {
      e.preventDefault();
      setHightlighted(hightlighted + 1);
    }


    if (e.key === 'Enter') {
      e.preventDefault();
      setSearch(data[hightlighted - 1].name);
      setCart([...cart, data[hightlighted - 1]]);
      toast.success(`${data[hightlighted - 1].name} added to cart`,{autoClose: 500});
      setSearch('');
    }
  }


  useEffect(() => { getData(); }, [getData])


  const handleCart = (e) => {
    e.preventDefault();
    setViewCart(!viewCart);
  }

  return (
    <Divider>
      <ToastContainer />
      <div className="d-flex justify-content-between ">
        <input id="search-input" autoFocus onKeyDown={(ev) => { handleKeyDown(ev) }} onChange={handleSearch} value={search} tabIndex={0} className="prime-input" type="text" placeholder="Search for tests" />
        <button tabIndex={data.length + 1} className="btn-success" onClick={(ev) => { handleCart(ev) }}>{cart.length} View Cart</button>
      </div>
      <div className={viewCart && cart.length > 0 ? "grid grid-two" : ""}>
        <div>
          {/*test list appear heere  */}
          {loading && <div className="loader"></div>}
          {data.length == 0 && !loading && <div className="text-center">No data found</div>}
          {!loading && data.length > 0 && <div className="list-group test-wrapper">
            {data.map((item, index) => {
              return (
                <div onKeyDown={(ev) => { listKeyDown(ev) }} onDoubleClick={(ev) => { listClicked(index, item) }} tabIndex={index + 1} key={index}
                  className={`list-group-item  list-group-item-hover d-flex justify-content-between 
              ${hightlighted == index + 1 ? "highlighted-item" : " "}`}>
                  <span> {item?.name}</span>
                  <span> {internationCurrencyFormat(item?.price)}</span>
                </div>
              )
            })}
          </div>}
        </div>
        <div>
          {viewCart && cart.length > 0 && <div className="cart-wrapper">
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
            <button className="btn-success my-2">Checkout</button>
          </div>}
        </div>
      </div>
    </Divider>
  )
}