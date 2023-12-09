"use client";
import Divider from "@/components/Divider";
import { customFetch } from "@/components/request/util";
import { useCallback, useEffect, useState } from "react";

export default function WaitingList() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ type: '', startdate: '', enddate: '' });
  const [data, setData] = useState([]);

  const getData = useCallback(async (clinicianid) => {
    const response = await customFetch(`clinician/resultsets?clinicianid=${clinicianid}&&startdate=${query.startdate}&&enddate=${query.enddate}`);
    const { result, status, statusCode } = response;
    if (statusCode == 200 && status == 'success' && result.length > 0) {
      setData(result); setLoading(false);
    } else {
      setData([]); setLoading(false);
    }
  }, [query])

  useEffect(() => {
    getData(2);
  }, []);


  return (
    <Divider>
      <div className="filtering-waitinglist">
        <select className="prime-select" onChange={(ev) => setQuery({ ...query, type: ev.target.value })}>
          <option value="all">All</option>
          <option value='sampling'>pending sampling</option>
          <option value='processing'>sample processing</option>
          <option value='ready' >result ready</option>
          <option value='approved'>approved</option>
        </select>
        <input type="date" onChange={(ev) => setQuery({ ...query, startdate: ev.target.value })} className="prime-input mx-2" />
        <input type="date" onChange={(ev) => setQuery({ ...query, enddate: ev.target.value })} className="prime-input mx-2" />
        <button className="btn-orange" onClick={(ev) => { getData(2) }}>search</button>
      </div>
      <section className="my-2">
        {loading && <h4 className="loader"></h4>}
        {!loading && data.length > 0 && (
          <>
            <div className="list-group">
              {data.map((item, index) => {
                return (
                  <div className="list-group-item front-filtering-client " key={index}>
                    <p>{item?.billingid}</p>
                    <p>{item?.fullname}</p>
                    <p>{new Date(item?.billingdate).toLocaleDateString()}</p>
                    <p>status: {item.ready_count}{"/" }{item.totaltest}</p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </section>
    </Divider>
  )
}