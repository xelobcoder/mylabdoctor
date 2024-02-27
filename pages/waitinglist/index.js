import { customFetch } from "@/components/request/util";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthenticationContext";

export default function WaitingList() {
  const { auth } = useContext(AuthContext);
  const clinicianid = auth?.employeeid;
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ type: '', startdate: '', enddate: '' });
  const [data, setData] = useState([]);
  const navigation = useRouter();

  const getData = useCallback(async (clinicianid) => {
    try {
      setLoading(true);
      const response = await customFetch(`clinician/resultsets?clinicianid=${clinicianid}&&startdate=${query.startdate}&&enddate=${query.enddate}`);
      const { result, status, statusCode } = response;
      if (statusCode == 200 && status == 'success' && result.length > 0) {
        setData(result); setLoading(false);
      } else {
        setData([]); setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setData([]);
      alert('connection to server failed');
    }
  }, [query])

  useEffect(() => {
    if (clinicianid) {
      getData(clinicianid);
   };
  }, [clinicianid]);


  const navigateTo = (billingid, fullname) => {
    setLoading(true);
    navigation.push(`/waitinglist/viewreport?billingid=${billingid}&&clientname=${fullname}`);
  }


  return (
    <>
      <section>
        <div className='col-12'>
          <input type="date" onChange={(ev) => setQuery({ ...query, startdate: ev.target.value })} className="custom-input col-2" />
          <input type="date" onChange={(ev) => setQuery({ ...query, enddate: ev.target.value })} className="custom-input mx-2 col-2" />
          <button className="btn btn-primary btn-sm" onClick={(ev) => { getData(2) }}>search</button>
        </div>
      </section>
      <section className="my-2">
        <div className="list-group">
              {data.map((item, index) => {
                return (
                  <div className="list-group-item bg-white grid-5 p-1 " key={index}>
                    <p>BillingId:{item?.billingid}</p>
                    <p>Fullname:{item?.fullname}</p>
                    <p>BilledOn: {new Date(item?.billingdate).toLocaleDateString()}</p>
                    <p>status: {item.ready_count}{"/"}{item.totaltest}</p>
                    <p>
                      <button type="button" onClick={(ev) => { navigateTo(item?.billingid, item?.fullname) }} className="btn-orange p-1">view reports</button>
                    </p>
                  </div>
                )
              })}
        </div>
      </section>
    </>
  )
}