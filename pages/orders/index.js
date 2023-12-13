"use client";
import { AuthContext } from "@/components/AuthenticationContext";
import ListItemDisplay from "@/components/ListItemDisplay";
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


  console.log(data);

  return (
    <>
      {loading && <h4 className="loader"></h4>}
      {!loading && data.length > 0 && (
        <div className="list-group">
          <div className="list-group-item grid grid-5 bg-secondary text-capitalize">
            <span>patientid</span>
            <span>fullname</span>
            <span>order date and time</span>
            <span>birth date</span>
            <span>status</span>
          </div>
          {data.map((item, index) => {
            return (
              <>
                <ListItemDisplay key={index} item={item} index={index} />
              </>
            )
          })}
        </div>
      )}
    </>
  )
}