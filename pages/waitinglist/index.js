import { customFetch } from "../../components/request/util";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../components/AuthenticationContext";
import TableDisplay from "../../components/accessories/TableDisplay";

export default function WaitingList() {
  const { auth } = useContext(AuthContext);
  const clinicianid = auth?.employeeid;
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ type: '', startdate: '', enddate: '', count: 10, page: 1 });
  const [data, setData] = useState([]);
  const navigation = useRouter();

  const getData = useCallback(async () => {
    if (!clinicianid) return;
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
    }
  }, [query, clinicianid])

  useEffect(() => {
    getData()
  }, [getData]);


  const navigateTo = (billingid, fullname,patientid) => {
    setLoading(true);
    navigation.push(`/waitinglist/viewreport?billingid=${billingid}&&clientname=${fullname}&&patientid=${patientid}`);
  }


  const columns = [
    { Header: 'fullname', accessor: "fullname" },
    { Header: "billingdate", accessor: "billingdate" },
    { Header: 'status', accessor: "ready_count", Cell: ({ value, row }) => { return <div>{row.original.totaltest}{"/"}{value}</div> } },
    {
      Header: "action", accessor: "", Cell: ({ row }) => {
        const item = row.original;
       return  <button onClick={(ev) => { navigateTo(item?.billingid, item?.fullname,item.patientid) }} className='btn btn-primary btn-sm'>view reports</button>
      }
    }
  ]
  return (
    <>
      <section>
        <div className='col-12'>
          <input className='custom-input col-3' type='number' placeholder='patientid' onChange={(ev) => setQuery({ ...query, patientid: ev.target.value })} />
          <input type="date" onChange={(ev) => setQuery({ ...query, startdate: ev.target.value })} className="custom-input col-2 mx-2" />
          <input type="date" onChange={(ev) => setQuery({ ...query, enddate: ev.target.value })} className="custom-input mx-2 col-2" />
          <button className="btn btn-primary btn-sm" onClick={(ev) => { getData(2) }}>search</button>
        </div>
      </section>
      <section className="my-2">
        <TableDisplay data={data} column={columns} />
      </section>
    </>
  )
}