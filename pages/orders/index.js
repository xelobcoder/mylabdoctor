import { AuthContext } from "../../components/AuthenticationContext";
import ListItemDisplay from "../../components/ListItemDisplay";
import Loader from "../../components/accessories/Loader";
import Pagination from "../../components/accessories/pagination";
import { getOrders } from "../../lib/ordersUtil";
import { useCallback, useContext, useEffect, useState } from "react";

export default function OrdersPage() {
  const { auth } = useContext(AuthContext);
  const clinicianid = auth?.employeeid;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);

  const getData = useCallback(getOrders, []);

  useEffect(() => {
    if (clinicianid) getData(clinicianid, setData, setLoading);
  }, [getData, clinicianid]);


  const handleActive = (value) => {
    if (!typeof value == 'number') return;
    if (value === active)
      setActive(null)
    else
      setActive(value);
  }



  const renderingView = () => {
    if (loading) {
      return <Loader />
    } else {
      return (
        <div className="list-group br-0 pointer">
          <div className="list-group-item grid grid-5 bg-light text-capitalize">
            <span>patientid</span>
            <span>fullname</span>
            <span>order date and time</span>
            <span>birth date</span>
            <span>status</span>
          </div>
          {data.map((item, index) => <ListItemDisplay active={active} setActive={handleActive} key={index} item={item} index={index} />)}
          <div className='d-flex justify-content-center mt-2'>
            <Pagination/>
          </div>
        </div>
      )
    }
  }


  return (
    <section>
      {renderingView()}
    </section>
  )
}