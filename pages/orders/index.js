import { AuthContext } from "@/components/AuthenticationContext";
import ListItemDisplay from "@/components/ListItemDisplay";
import Loader from "@/components/accessories/loader";
import { getOrders } from "@/lib/ordersUtil";
import { useCallback, useContext, useEffect, useState } from "react";

export default function OrdersPage() {
  const { auth } = useContext(AuthContext);
  const clinicianid = auth?.employeeid;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(getOrders, []);

  useEffect(() => {
    if (clinicianid) getData(clinicianid, setData, setLoading);
  }, [getData, clinicianid]);



  const renderingView = () => {
    if (loading) {
      return <Loader />
    } else {
      return (
        <div className="list-group br-0">
          <div className="list-group-item grid grid-5">
            <span>patientid</span>
            <span>fullname</span>
            <span>order date and time</span>
            <span>birth date</span>
            <span>status</span>
          </div>
          {data.map((item, index) => <ListItemDisplay key={index} item={item} index={index} />)}
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